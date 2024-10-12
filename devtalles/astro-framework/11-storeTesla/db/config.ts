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

// https://astro.build/db/config
export default defineDb({
  tables: {
    Role,
    User, 
  }
});
