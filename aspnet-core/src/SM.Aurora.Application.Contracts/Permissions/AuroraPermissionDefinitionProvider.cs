using SM.Aurora.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace SM.Aurora.Permissions;

public class AuroraPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var bikeShopGroup = context.AddGroup(AuroraPermissions.GroupName, L("Permission:BikeShop"));

        var bikesPermission = bikeShopGroup.AddPermission(AuroraPermissions.Bikes.Default, L("Permission:Bikes"));
        bikesPermission.AddChild(AuroraPermissions.Bikes.Create, L("Permission:Bikes.Create"));
        bikesPermission.AddChild(AuroraPermissions.Bikes.Edit, L("Permission:Bikes.Edit"));
        bikesPermission.AddChild(AuroraPermissions.Bikes.Delete, L("Permission:Bikes.Delete"));

        var customersPermission = bikeShopGroup.AddPermission(AuroraPermissions.Customers.Default, L("Permission:Customers"));
        customersPermission.AddChild(AuroraPermissions.Customers.Create, L("Permission:Customers.Create"));
        customersPermission.AddChild(AuroraPermissions.Customers.Edit, L("Permission:Customers.Edit"));
        customersPermission.AddChild(AuroraPermissions.Customers.Delete, L("Permission:Customers.Delete"));

    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AuroraResource>(name);
    }
}
