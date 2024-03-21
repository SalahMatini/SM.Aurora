using System.Threading.Tasks;

namespace SM.Aurora.Data;

public interface IAuroraDbSchemaMigrator
{
    Task MigrateAsync();
}
