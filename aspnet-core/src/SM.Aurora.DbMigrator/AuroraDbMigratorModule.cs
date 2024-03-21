using SM.Aurora.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace SM.Aurora.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AuroraEntityFrameworkCoreModule),
    typeof(AuroraApplicationContractsModule)
    )]
public class AuroraDbMigratorModule : AbpModule
{
}
