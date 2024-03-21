using Volo.Abp.Modularity;

namespace SM.Aurora;

/* Inherit from this class for your domain layer tests. */
public abstract class AuroraDomainTestBase<TStartupModule> : AuroraTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
