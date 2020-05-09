const MenuData = [
  {
    header: "COMPANY MANAGEMENT",
    list: [
      { name: "dashboard", icon: "dashboard" },
      { name: "company details", icon: "building outline" },
      { name: "contact details", icon: "volume control phone" },
      { name: "Terms of services", icon: "servicestack" },
      { name: "category", icon: "server" },

      // "dashboard",
      // "company details",
      // "contact details",
      // "Terms of services",
      // "category",
    ],
  },
  {
    header: "CUSTOMER MANAGEMENT",
    list: [
      { name: "user list", icon: "users" },
      { name: "site list", icon: "cart" },
      { name: "domain list", icon: "bars" },
      { name: "customer tickets", icon: "chat" },
      { name: "income", icon: "chart line" },

      //  "site list", "domain list", "customer tickets"
    ],
  },
  {
    header: "DEVELOPER MANAGEMENT",
    list: [
      { name: "developer list", icon: "user secret" },
      { name: "script list", icon: "file archive" },
      { name: "payment", icon: "money bill alternate" },
      { name: "developer tickets", icon: "comments" },
      // "developer list", "script list", "payment", "developer tickets"
    ],
  },
  {
    header: "BUSINESS PLAN MANAGEMENT",
    list: [
      { name: "business user list", icon: "warehouse" },
      { name: "question adding", icon: "question" },
      { name: "question List", icon: "question" },
    ],
  },
];
export function getMenu() {
  return MenuData;
}
