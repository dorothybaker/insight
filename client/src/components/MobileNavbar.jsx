import { Link } from "react-router-dom";

export default function MobileNavbar() {
  const links = [
    { name: "Lifestyle", href: "/?category=lifestyle" },
    { name: "Technology", href: "/?category=technology" },
    { name: "Businness", href: "/?category=business" },
    { name: "Entertainment", href: "/?category=entertainment" },
    { name: "Fashion", href: "/?category=fashion" },
    { name: "Culture", href: "/?category=culture" },
  ];
  return (
    <div className="flex md:hidden px-3 py-2 w-full items-center justify-center shadow-sm shadow-teal-50/[0.03]">
      <div className="flex items-center gap-x-4 px-1 overflow-x-auto">
        {links.map((link) => (
          <Link key={link.name} to={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
