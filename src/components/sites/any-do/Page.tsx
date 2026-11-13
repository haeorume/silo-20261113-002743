const SOURCE = "https://www.any.do";
const TITLE = "Any.do";
const SRC = (process.env.PAGES_BASE || "") + "/sites/any-do/index.html";

export default function Page() {
  return (
    <iframe
      src={SRC}
      title={TITLE}
      data-source={SOURCE}
      className="fixed inset-0 h-full w-full border-0 bg-white"
    />
  );
}
