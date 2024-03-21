using SM.Aurora.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace SM.Aurora.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AuroraController : AbpControllerBase
{
    protected AuroraController()
    {
        LocalizationResource = typeof(AuroraResource);
    }
}
