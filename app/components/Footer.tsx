// Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full max-w-5xl mx-auto text-center py-4">
      <p className="text-sm text-black leading-tight">
        Minimal. Fast. Developer-focused. <br /> © {new Date().getFullYear()}{" "}
        Avani Patel. All rights reserved.
      </p>
    </footer>
  );
}
