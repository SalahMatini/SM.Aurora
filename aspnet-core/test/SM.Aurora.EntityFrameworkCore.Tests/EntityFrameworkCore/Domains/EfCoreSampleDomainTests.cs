using SM.Aurora.Samples;
using Xunit;

namespace SM.Aurora.EntityFrameworkCore.Domains;

[Collection(AuroraTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<AuroraEntityFrameworkCoreTestModule>
{

}
