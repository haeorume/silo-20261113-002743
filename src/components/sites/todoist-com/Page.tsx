const SOURCE = "https://www.todoist.com";
const TITLE = "Todoist";
const SRC = (process.env.PAGES_BASE || "") + "/sites/todoist-com/index.html";

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
