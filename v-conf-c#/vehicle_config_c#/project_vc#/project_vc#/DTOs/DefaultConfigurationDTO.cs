namespace project_vc_.DTOs;

public class DefaultConfigurationDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? CompName { get; set; }
    public string? CompType { get; set; }

    public DefaultConfigurationDTO() { }
    public DefaultConfigurationDTO(int id, string? name, string? compName, string? compType)
    {
        Id = id;
        Name = name;
        CompName = compName;
        CompType = compType;
    }
}
