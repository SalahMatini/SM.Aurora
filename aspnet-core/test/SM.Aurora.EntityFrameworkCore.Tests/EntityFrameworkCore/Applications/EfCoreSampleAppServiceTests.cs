using SM.Aurora.Samples;
using Xunit;

namespace SM.Aurora.EntityFrameworkCore.Applications;

[Collection(AuroraTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<AuroraEntityFrameworkCoreTestModule>
{

}
