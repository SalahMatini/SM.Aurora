using Xunit;

namespace SM.Aurora.EntityFrameworkCore;

[CollectionDefinition(AuroraTestConsts.CollectionDefinitionName)]
public class AuroraEntityFrameworkCoreCollection : ICollectionFixture<AuroraEntityFrameworkCoreFixture>
{

}
