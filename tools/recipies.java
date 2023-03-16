new MeatJerky(itemGroups.food, SlimefunItems.BEEF_JERKY, RecipeType.ENHANCED_CRAFTING_TABLE,
new ItemStack[] {SlimefunItems.SALT, new ItemStack(Material.COOKED_BEEF), null, null, null, null, null, null, null})
.register(plugin);

new MeatJerky(itemGroups.food, SlimefunItems.BEEF_JERKY, RecipeType.ENHANCED_CRAFTING_TABLE,
new ItemStack[] {SlimefunItems.SALT, new ItemStack(Material.COOKED_BEEF), null, null, null, null, null, null, null})
.register(plugin);

new Refinery(itemGroups.electricity, SlimefunItems.REFINERY, RecipeType.ENHANCED_CRAFTING_TABLE,
new ItemStack[] {SlimefunItems.HARDENED_GLASS, SlimefunItems.REDSTONE_ALLOY, SlimefunItems.HARDENED_GLASS, SlimefunItems.HARDENED_GLASS, SlimefunItems.REDSTONE_ALLOY, SlimefunItems.HARDENED_GLASS, new ItemStack(Material.PISTON), SlimefunItems.ELECTRIC_MOTOR, new ItemStack(Material.PISTON)})
.setCapacity(256)
.setEnergyConsumption(16)
.setProcessingSpeed(1)
.register(plugin);