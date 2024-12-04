import { Input } from "@nextui-org/input";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from "@nextui-org/dropdown";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSearch,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";


export function AdminNavbar({}) {
  return (
    <Navbar
      isBordered
      className="w-full"
    >
      <NavbarContent className="md:hidden">
        <span>버튼</span>
      </NavbarContent>

      <NavbarContent className="w-full max-md:hidden">
        <Input
          startContent={<FontAwesomeIcon icon={faSearch} />}
          isClearable
          className="w-full"
          placeholder="Search..."
        />
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        <NotificationsDropdown />

        <div className="max-md:hidden">
          <FontAwesomeIcon icon={faSuperpowers} />
        </div>

        <div className="max-md:hidden">
          <FontAwesomeIcon icon={faClock} />
        </div>
      </NavbarContent>
    </Navbar>
  )
}

function NotificationsDropdown({ }) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <FontAwesomeIcon icon={faBell} />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};