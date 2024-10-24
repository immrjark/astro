import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({primaryKey: true, unique: true}),
    name: column.text(),
    email: column.text({unique: true}),
    password: column.text(),
    createdAt: column.date({default: new Date()}),
    role: column.text({ references: () => Role.columns.id})  // esta es la forma de hacer referencias en las tablas en astro
    // serán: admin, user, superUser 👆🏽
  }
})

const Role = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    name: column.text()
  }
})

// Products
const Product = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    description: column.text(),
    gender: column.text(),
    price: column.number(),
    sizes: column.text(),
    slug: column.text({unique: true}),
    stock: column.number(),
    tags: column.text(),
    title: column.text(),
    type: column.text(),

    //relación
    user: column.text({references: () => User.columns.id}) // significa -> un usuario tiene muchos productos
  }
})

const ProductImage = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    productId: column.text({references: () => Product.columns.id}),
    image: column.text()
  }
 })

// https://astro.build/db/config
export default defineDb({
  tables: {
    Role,
    User,
    Product,
    ProductImage,
  }
});
