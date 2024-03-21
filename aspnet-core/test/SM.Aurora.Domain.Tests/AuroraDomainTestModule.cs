using Volo.Abp.Modularity;

namespace SM.Aurora;

[DependsOn(
    typeof(AuroraDomainModule),
    typeof(AuroraTestBaseModule)
)]
public class AuroraDomainTestModule : AbpModule
{

}
