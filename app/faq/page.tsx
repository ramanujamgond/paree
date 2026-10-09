import { FAQ } from "@/content/site";
import { PageIntro } from "@/components/ui";
import { OrderingBand } from "@/components/footer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Questions", "Answers about Pyaree wood-pressed oils, sizes, ordering and delivery enquiries.", "/faq");
export default function Faq() { return <><PageIntro label="A little clarity" title="Good questions." text="A few things you might want to know before bringing Pyaree home."/><div className="faq-list">{FAQ.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><OrderingBand/></>; }
