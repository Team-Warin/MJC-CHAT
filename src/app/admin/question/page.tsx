// import prisma from '@/lib/prisma';
import styles from '@/styles/dashboard.module.css';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link"
import { Button } from '@nextui-org/button';
export default async function AdminPage() {
  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  //   select: {
  //     avatar: true,
  //     nickname: true,
  //     email: true,
  //     roles: true,
  //     createdAt: true,
  //   },
  // });

  return (
    <div>
      <Navbar>
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarBrand>
            <p className="font-bold text-inherit">명전이</p>
          </NavbarBrand>
          <NavbarItem>
            <Link color="foreground" href="#">
              User
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" aria-current="page">
              Question
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      ddddd
    </div>
  );
}
