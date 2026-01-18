import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div >
      <main >
        {children}
        {sidebar}
      </main>
    </div>
  );
}
