using Microsoft.EntityFrameworkCore;
using SM.Aurora.Bikes;
using SM.Aurora.Customers;
using SM.Aurora.Orders;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace SM.Aurora.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class AuroraDbContext :
    AbpDbContext<AuroraDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    public DbSet<Bike> Bikes { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public AuroraDbContext(DbContextOptions<AuroraDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        builder.Entity<Bike>(b =>
        {
            b.ToTable(AuroraConsts.DbTablePrefix + "Bikes",
                AuroraConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.Property(x => x.Brand).IsRequired().HasMaxLength(128);
            b.Property(x => x.Model).IsRequired().HasMaxLength(128);
            b.Property(x => x.Type).IsRequired();
            b.Property(x => x.Color).IsRequired().HasMaxLength(50);
            b.Property(x => x.ReleaseYear).IsRequired();
            b.Property(x => x.Price).IsRequired();
        });

        builder.Entity<Customer>(c =>
        {
            c.ToTable(AuroraConsts.DbTablePrefix + "Customers",
                AuroraConsts.DbSchema);
            c.ConfigureByConvention(); //auto configure for the base class props
            c.Property(x => x.FirstName).IsRequired().HasMaxLength(50);
            c.Property(x => x.LastName).IsRequired().HasMaxLength(50);
            c.Property(x => x.DateOfBirth).IsRequired();
            c.Property(x => x.Gender).IsRequired();
            c.Property(x => x.Email).IsRequired().HasMaxLength(256);
            c.Property(x => x.PhoneNumber).IsRequired().HasMaxLength(20);
            c.Property(x => x.Country).IsRequired();
            c.Property(x => x.Address).IsRequired().HasMaxLength(256);

        });

        builder.Entity<Order>(o =>
        {
            o.ToTable(AuroraConsts.DbTablePrefix + "Orders",
                AuroraConsts.DbSchema);
            o.ConfigureByConvention(); //auto configure for the base class props

            o.HasKey(x => x.OrderId);

            o.Property(x => x.OrderDate).IsRequired();
            o.Property(x => x.OrderStatus).IsRequired();
            o.Property(x => x.ShippingAddress).IsRequired().HasMaxLength(256);

            o.HasOne<Customer>(o => o.Customer).WithMany().HasForeignKey(x => x.CustomerId).IsRequired();
        });
    }
}
