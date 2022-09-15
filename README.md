# Prisma (Node ORM)

Modelling a OneToMany relationship with users and posts inside prisma schema

sync DB & Prisma
..move data from your local DB to Prisma and vice versa

For executing the migrations type:
> npx prisma migrate dev --name init  

For generating a schema based solely on the introspected database and ignore any existing schema file type:
> npx prisma db pull --force

Prisma Studio
> npx prisma studio
...web client (running on localhost:5555) for convenient CRUD operations

Steps:
Create REST API (with express)  and use Prisma as ORM

  -> install express
  -> install prisma client

>npm install express
>npm install @prisma/client

etc.

For more information read the excellent documention on:
"https://www.prisma.io/docs/concepts/components/introspection"
