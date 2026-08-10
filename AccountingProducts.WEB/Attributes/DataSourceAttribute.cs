namespace AccountingProducts.WEB.Attributes;

/// <summary>
/// Указывает источник данных для поля (модель, откуда брать данные)
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property, AllowMultiple = false)]
public class DataSourceAttribute : Attribute
{
    public Type ModelType { get; }

    public DataSourceAttribute(Type modelType)
    {
        ModelType = modelType;
    }
}
