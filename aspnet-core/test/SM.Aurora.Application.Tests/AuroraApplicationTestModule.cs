using Volo.Abp.Modularity;

namespace SM.Aurora;

[DependsOn(
    typeof(AuroraApplicationModule),
    typeof(AuroraDomainTestModule)
)]
public class AuroraApplicationTestModule : AbpModule
{

}
