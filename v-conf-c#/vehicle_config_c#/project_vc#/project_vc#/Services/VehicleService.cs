using Microsoft.EntityFrameworkCore;
using project_vc_.Data;
using project_vc_.DTOs;
using project_vc_.Models;

namespace project_vc_.Services;

public interface IVehicleService
{
    // WelcomeService methods
    Task<List<SegmentDTO>> GetAllSegmentsAsync();
    Task<List<ManufacturerDTO>> GetManufacturersBySegmentAsync(int segId);
    Task<List<ModelDTO>> GetModelsAsync(int segId, int mfgId);

    // DefaultConfigService methods
    Task<DefaultConfigResponseDTO> GetDefaultConfigurationAsync(int modelId, int quantity);

    // VehicleManager methods
    Task<List<ComponentDropdownDTO>> GetConfigurableComponentsAsync(int modelId, string compType);

    // VehicalDetails methods
    Task<List<string>> GetConfigurableComponentNamesAsync(int modelId, string compType);

    // AlternateComponentManager methods
    Task SaveAlternateComponentsAsync(AlternateComponentSaveDTO dto);
}

public class VehicleService : IVehicleService
{
    private readonly ApplicationDbContext _context;

    public VehicleService(ApplicationDbContext context)
    {
        _context = context;
    }

    // WelcomeService
    public async Task<List<SegmentDTO>> GetAllSegmentsAsync()
    {
        return await _context.Segments
            .Select(s => new SegmentDTO 
            { 
                Id = s.Id,
                Name = s.SegName
            })
            .ToListAsync();
    }

    public async Task<List<ManufacturerDTO>> GetManufacturersBySegmentAsync(int segId)
    {
        return await _context.SgMfgMasters
            .Where(x => x.SegId == segId)
            .Include(x => x.Mfg)
            .Select(x => x.Mfg)
            .Distinct()
            .Select(m => new ManufacturerDTO 
            {
                Id = m!.Id,
                Name = m.MfgName
            })
            .ToListAsync();
    }

    public async Task<List<ModelDTO>> GetModelsAsync(int segId, int mfgId)
    {
        return await _context.VehicleModels
            .Where(m => m.SegId == segId && m.MfgId == mfgId)
            .Select(m => new ModelDTO
            {
                Id = m.Id,
                Name = m.ModelName,
                Price = m.Price,
                MinQty = m.MinQty,
                ImagePath = m.ImgPath
            })
            .ToListAsync();
    }

    // DefaultConfigService
    public async Task<DefaultConfigResponseDTO> GetDefaultConfigurationAsync(int modelId, int quantity)
    {
        var model = await _context.VehicleModels
            .Include(m => m.Seg)
            .Include(m => m.Mfg)
            .FirstOrDefaultAsync(m => m.Id == modelId)
            ?? throw new Exception("Invalid model");

        var defaultDetails = await _context.VehicleDetails
            .Where(vd => vd.ModelId == modelId && vd.IsConfig == "Y")
            .Include(vd => vd.Comp)
            .ToListAsync();

        var uniqueComponents = defaultDetails
            .GroupBy(vd => vd.Comp!.CompName)
            .Select(g => g.OrderBy(vd => vd.Comp!.Price).First())
            .Select(vd => new DefaultConfigurationDTO(vd.Comp!.CompId, vd.Comp!.Type, vd.Comp.CompName, vd.CompType))
            .ToList();

        double unitPrice = model.Price;
        double totalPrice = unitPrice * quantity;

        var response = new DefaultConfigResponseDTO(
            model.Id,
            model.ModelName,
            model.Seg?.SegName,
            model.Mfg?.MfgName,
            unitPrice,
            model.MinQty,
            totalPrice,
            model.ImgPath
        );
        response.DefaultComponents = uniqueComponents;

        return response;
    }

    // VehicleManager
    public async Task<List<ComponentDropdownDTO>> GetConfigurableComponentsAsync(int modelId, string compType)
    {
        var details = await _context.VehicleDetails
            .Include(vd => vd.Comp)
            .Where(vd => vd.ModelId == modelId && vd.CompType == compType && vd.IsConfig == "Y")
            .ToListAsync();


        var grouped = details.GroupBy(vd => vd.Comp!.CompId)
            .Select(g => new ComponentDropdownDTO
            {
                BaseCompId = g.Key,
                ComponentName = g.First().Comp!.CompName,
                Options = g.Select(vd => new OptionDTO
                {
                    CompId = vd.Comp!.CompId,
                    SubType = vd.Comp.Type,
                    Price = vd.Comp.Price
                }).ToList()
            })
            .ToList();

        return grouped;
    }

    public async Task<List<string>> GetConfigurableComponentNamesAsync(int modelId, string compType)
    {
        return await _context.VehicleDetails
            .Where(v => v.ModelId == modelId && v.IsConfig == "Y" && v.CompType == compType)
            .Include(v => v.Comp)
            .Select(v => v.Comp!.CompName!)
            .ToListAsync();
    }

    public async Task SaveAlternateComponentsAsync(AlternateComponentSaveDTO dto)
    {
        if (dto.ModelId == null) throw new Exception("Model ID missing");

        var model = await _context.VehicleModels.FindAsync(dto.ModelId)
                    ?? throw new Exception("Model not found");

        if (dto.Components != null)
        {
            foreach (var item in dto.Components)
            {
                if (item.CompId == null || item.AltCompId == null) continue;

                var original = await _context.Components.FindAsync(item.CompId)
                               ?? throw new Exception("Original component not found");

                var alternate = await _context.Components.FindAsync(item.AltCompId)
                                ?? throw new Exception("Alternate component not found");

                if (original.CompName != alternate.CompName)
                {
                    throw new Exception("Invalid component replacement");
                }

                double deltaPrice = alternate.Price - original.Price;

                // Find existing
                var acm = await _context.AlternateComponentMasters
                    .FirstOrDefaultAsync(a => a.ModelId == dto.ModelId && a.CompId == item.CompId);

                if (acm == null)
                {
                    acm = new AlternateComponentMaster
                    {
                        ModelId = dto.ModelId,
                        CompId = item.CompId
                    };
                    _context.AlternateComponentMasters.Add(acm);
                }

                acm.AltCompId = item.AltCompId;
                acm.DeltaPrice = deltaPrice;
            }
            await _context.SaveChangesAsync();
        }
    }
}
