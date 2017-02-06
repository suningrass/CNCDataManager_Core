﻿using System;
using System.Collections.Generic;
using CNCDataManager.Models;
using CNCDataManager.Models.Simulation;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using CNCDataManager.Controllers.Internals;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;

namespace CNCDataManager.Controllers
{
    [EnableCors("FullOpen")]
    [Route("api/cncdata/[controller]/[action]")]
    public class SimulationController: Controller
    {
        private readonly string _webRootPath;

        public SimulationController(IHostingEnvironment host)
        {
            _webRootPath = host.WebRootPath;
        }

        [HttpGet]
        public string Index()
        {
            return "test";
        }

        [HttpPost]
        public string StartSimulation([FromBody] SimulationPara para)
        {
            //设置模型路径
            PathSettings path = new PathSettings(_webRootPath, para.AxisID);

            Simulator simulator = new Simulator(path);

            //进行模型替换
            //await Task.Run(() => 
            //{
                simulator.PrepareSimulationModel(para);

                //进行模型编译求解
                simulator.PreprocessCompiler(para.Setting);
                simulator.CreateCompiler();
                simulator.RunCompiler();

                //进行结果转换
                simulator.MsfToTxt();
            //});


            //返回独一无二的个人信息标识，后序通过此标识获取仿真结果
            return path.TempId;
        }

        [HttpPost]
        public async Task<string> DelayTest([FromBody] SimulationPara para)
        {
            await Task.Delay(10000);
            return "36e4d31a-191f-4abb-ad27-87f04684abf2";
        }

        [HttpGet]
        public async Task<JsonResult> SimulationResults([FromQuery]string fileID, [FromQuery] string type)
        {
            string dataPath = Path.Combine(_webRootPath, "Mworks", "Temp", fileID, "data");
            string timeFile = Path.Combine(dataPath, "time.txt");
            string dataFile = Path.Combine(dataPath, "a.txt");
            if(type == "a" || type == "v" || type == "X")
            {
                dataFile = Path.Combine(dataPath, type + ".txt");
            }
            string[] times = null;
            string[] data = null;
            await Task.Run(() =>
            {
                times = System.IO.File.ReadAllLines(timeFile, Encoding.UTF8);
                data = System.IO.File.ReadAllLines(dataFile, Encoding.UTF8);
            });
            return Json(new { data = MinifyData(times, data, 100) });
        }

        /// <summary>
        /// 将数据大小按比例缩小
        /// </summary>
        /// <param name="times">横轴时间</param>
        /// <param name="data">某种类型的仿真数据</param>
        /// <param name="minifier">缩小倍数</param>
        /// <returns>缩小后的数组</returns>
        private List<string[]> MinifyData(string[] times, string[] data, int minifier)
        {
            if (minifier <= 0) throw new ArgumentException("minifier must greater than 0");
            List<string[]> result = new List<string[]>(data.Length / minifier + 1);
            for(int i = 0; i < data.Length; i += minifier)
            {
                result.Add(new string[2] { times[i], data[i] });
            }
            return result;
        }
    }
}