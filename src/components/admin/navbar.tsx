import { Input } from "@nextui-org/input";
import {
  Navbar,
  NavbarContent,
} from "@nextui-org/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";


export default function AdminNavbar({ }) {
  return (
    <Navbar
      isBordered
      className="w-full pt-3 pb-3"
    >
      <NavbarContent className="w-full">
        <Input
          startContent={<FontAwesomeIcon icon={faSearch} />}
          isClearable
          className="w-full"
          placeholder="검색..."
        />
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        {/** 인포, 로그아웃, 벨 만들어야 함*/}

        <Button
          isIconOnly
          disableRipple
          variant="light"
          aria-label="Like">
          <FontAwesomeIcon icon={faBell} />
        </Button>
        
        <Button
          isIconOnly
          disableRipple
          variant="light"
          aria-label="Like">
          <FontAwesomeIcon icon={faCircleInfo} />
        </Button>
      </NavbarContent>
    </Navbar>
  )
}