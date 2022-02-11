using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReadSeries.Models;
using System;
using System.Web;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LumenWorks.Framework.IO.Csv;
using System.IO;
using System.Data;
using Microsoft.AspNetCore.Http;
using System.Text;

namespace ReadSeries.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public ActionResult LerCSV(IFormFile arquivo)
        {
            if (ModelState.IsValid)
            {
                if (arquivo != null && arquivo.Length > 0)
                {
                    if (arquivo.FileName.EndsWith(".csv"))
                    {
                        try
                        {
                            var reader = new StreamReader(arquivo.OpenReadStream(), Encoding.UTF8, true);
                            DataTable dtcsv = new DataTable();
                            int count = 0;

                            while (!reader.EndOfStream)
                            {
                                var line = reader.ReadLine();
                                string[] values = line.Split(';');

                                if (count == 0)
                                {
                                    foreach (string value in values)
                                    {
                                        dtcsv.Columns.Add(value);
                                    }
                                }
                                else
                                {
                                    dtcsv.Rows.Add(values);
                                }
                                count += 1;
                            }

                            return View("Index", dtcsv);
                        }
                        catch (Exception ex)
                        {
                            ModelState.AddModelError("Erro ao executar leitura", ex.Message);
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("Arquivo", "Formato de arquivo inválido");
                    }
                }
            }
            return View("Index");
        }
    }
}
