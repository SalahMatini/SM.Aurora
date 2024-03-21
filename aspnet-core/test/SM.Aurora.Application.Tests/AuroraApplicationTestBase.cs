using Volo.Abp.Modularity;

namespace SM.Aurora;

public abstract class AuroraApplicationTestBase<TStartupModule> : AuroraTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
