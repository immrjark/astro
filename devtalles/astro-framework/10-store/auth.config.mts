// import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async({email, password}) => {

        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}` )) // es entre `` porque tiene que regresar un string pero a su vez, tienes que tenerlo en formato email

        if (!user) {
          throw new Error('Invalid credentials (email)')
        }

        if (!bcrypt.compareSync( password as string, user.password)) {
          throw new Error('Invalid credentials (password)')
        }
        
        const {password: _, ...rest} = user // porque como no quieres devolver la contraseña, la sacas aquí

        return rest
      }
    })
  ],
});