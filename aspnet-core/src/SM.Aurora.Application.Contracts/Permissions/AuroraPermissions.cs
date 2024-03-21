namespace SM.Aurora.Permissions;

public static class AuroraPermissions
{
    public const string GroupName = "BikeShop";

    public static class Bikes
    {
        public const string Default = GroupName + ".Bikes";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}
