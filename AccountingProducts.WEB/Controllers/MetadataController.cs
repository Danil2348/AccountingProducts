using AccountingProducts.WEB.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text.Json.Nodes;

namespace AccountingProducts.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetadataController() : ControllerBase
    {
        private static readonly JsonArray _metadataCache;

        static MetadataController()
        {
            _metadataCache = GetEntityTypesFromAssembly();
        }

        [HttpGet]
        public IActionResult GetMetadata()
        {
            return Ok(_metadataCache);
        }

        private static JsonArray GetEntityTypesFromAssembly()
        {
            var assembly = typeof(MetadataController).Assembly;
            var types = assembly.GetTypes().Where(t => t.IsClass && t.IsPublic && !t.IsAbstract &&
                                                        t.Namespace.StartsWith("AccountingProducts.WEB.Contracts") &&
                                                        !t.Name.StartsWith("Base"));

            var metadataCache = new JsonArray();

            foreach (var type in types)
            {
                var jsonEntity = new JsonObject()
                {
                    ["entityName"] = type.GetCustomAttribute<DisplayAttribute>()?.Name ?? type.Name,
                    ["typeName"] = type.Name,
                    ["source"] = type.GetCustomAttribute<DataSourceAttribute>()?.ModelType.Name ?? null
                };

                var jsonProperties = new JsonArray();
                var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (var property in properties)
                {
                    var jsonProperty = new JsonObject()
                    {
                        ["name"] = property.Name,
                        ["label"] = property.GetCustomAttribute<DisplayAttribute>()?.Name ?? property.Name,
                        ["datatype"] = property.PropertyType.Name,
                        ["source"] = property.GetCustomAttribute<DataSourceAttribute>()?.ModelType.Name ?? null
                    };

                    jsonProperties.Add(jsonProperty);
                }

                jsonEntity.Add("fields", jsonProperties);
                metadataCache.Add(jsonEntity);
            }

            return metadataCache;
        }
    }
}
