using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text.Json.Nodes;

namespace AccountingProducts.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetadataController() : ControllerBase
    {
        private static readonly Dictionary<Type, string> _typeMap = new()
        {
            [typeof(string)] = "string",
            [typeof(int)] = "integer",
            [typeof(long)] = "integer",
            [typeof(decimal)] = "decimal",
            [typeof(double)] = "decimal",
            [typeof(float)] = "decimal",
            [typeof(DateTime)] = "datetime",
            [typeof(DateTimeOffset)] = "datetime",
            [typeof(bool)] = "boolean",
            [typeof(Guid)] = "guid",
        };

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
                                                        t.Namespace == "AccountingProducts.WEB.Contracts");

            var metadataCache = new JsonArray();

            foreach (var type in types)
            {
                var jsonEntity = new JsonObject()
                {
                    ["entityName"] = type.GetCustomAttribute<DisplayAttribute>()?.Name ?? type.Name,
                    ["typeName"] = type.Name
                };

                var jsonProperties = new JsonArray();
                var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (var property in properties)
                {
                    var jsonProperty = new JsonObject()
                    {
                        ["name"] = property.Name,
                        ["label"] = property.GetCustomAttribute<DisplayAttribute>()?.Name ?? property.Name,
                        ["datatype"] = GetDataType(property.PropertyType)
                    };

                    jsonProperties.Add(jsonProperty);
                }

                jsonEntity.Add("fields", jsonProperties);
                metadataCache.Add(jsonEntity);
            }

            return metadataCache;
        }

        private static string GetDataType(Type type)
        {
            if (type.IsArray || (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IEnumerable<>)))
                return "array";

            var underlyingType = Nullable.GetUnderlyingType(type) ?? type;

            if (_typeMap.TryGetValue(underlyingType, out var dataType))
                return dataType;

            if (underlyingType.IsEnum)
                return "enum";

            return "object";
        }
    }
}
