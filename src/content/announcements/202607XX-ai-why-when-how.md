***Overall comments***
- What is the objective(s) of this writeup? Is it compelling ? the objective is to "educate" high level executives about the benefits of AI and how to get started in their own organizations
- first talk about why this blog entry exists at all, and then go into actual answers
- it is perhaps a bit too long: does it need to be split into 2-3 instead?
- having figures sourced from different places needs more interpretation
- Sourcing vs interpretation in the body - settle and spell it; add own interpretation right after the figures that go back to the primary objectives 
- Prefacing or setting the stage
- tighten the language and overall flow
- language needs to be simpler; reduce technical jargon
- make Connection to Vaiyu clear in a subtle manner
***


Everyone's Using AI. Almost Nobody Can Find It in the Earnings --- comment: so-what ? Is this a narrative or an interpretation or both ? Not sure if this title is appropriate although it catches attention;currently the content is does not support any points towards "earnings" - perhaps the title needs to be different and more targeted - perhaps this should be titled after the rest of doc is finished

Vaiyu Solutions | 29 July 2026


THE SHORT VERSION

- Why: the gains are real, and they have been measured properly. In controlled trials people worked about 25% faster and produced work rated 40% better. The same trials found those people got things wrong more often when the task fell outside what the tool was good at. Both halves of that matter. comment: Is this really the “when” or the “how”. There has to be stronger whys; this is more of a "how" or "why" question
- When: you are ready when you can name a decision that comes round every week and currently gets made on stale or partial information, and when the systems holding that information agree on what a site, a job, or a customer is. comment: Is this really the only when”. Need stronger and more arguments such as augmented operational intelligence
- How: most of what executives want from "AI" turns out to be arithmetic on joined-up data. A model earns its place on the handful of calls that arithmetic cannot reach. Keep a named person on every decision, and settle what "working" means before anyone starts building. comment: sounds a bit like when; "how" is about the mechanics; 
- The honest bit: sometimes the answer is "not yet." That advice is free, and it beats a project that quietly dies in month nine.


Two numbers, both true, and the distance between them is where all the interesting questions live.

As of mid-2025, 88% of organizations say they use AI regularly in at least one part of the business. About 39% can point to any impact on enterprise earnings. For most of those, it is under 5%. Roughly six percent can say AI contributes more than 5% of earnings.


>>> INSERT FIGURE 1 HERE <<<
File: figure-1-adoption-vs-value.png
Caption: Figure 1. Source: McKinsey & Company, "The State of AI in 2025," 5 November 2025 (n=1,993 across 105 countries; self-reported).


Same technology, same two years, wildly different results. So what separates that six percent from everyone else? In our experience it has very little to do with budget and nothing at all to do with which model they picked.


## FIRST, A MINUTE ON WHAT THE TECHNOLOGY IS

Strip away the mystique and the thing behind ChatGPT and its cousins is a prediction engine. It has read an enormous amount of text, and it produces answers one word at a time, with each word predicted from everything that came before it.

That one fact explains both the magic and the trouble.

The magic is that something predicting language this well can read ten thousand maintenance logs before lunch and tell you what is in them. It can draft a contract clause. It can reconcile four systems that have never once agreed on what a "department" is.

The magic of ai is that it can process data very fast in a variety of vectors (reading maintenace logs, drafting a contract clause, so on).

The trouble is that a prediction engine does not know things the way your controller knows things. When it is unsure, it does not go quiet. It guesses, fluently, in complete sentences, with excellent grammar. That is not a reason to walk away from it or get discouraged by it. It is how it is built that dictates its behavior, and it is why anything built seriously shows its sources and keeps a named person on the decision. This shows human participation.

You will hear a lot about "agents" this year too. An agent is the same prediction engine given permission to go and do things: look something up, fill in a form, kick off a report. Useful. Also the reason oversight matters more rather than less. if you extend this capability to write an "agent", it will need human oversight to ensure it does not go off<[fim-middle]> the rails.

The mental model we keep coming back to is a tireless junior analyst. Reads everything, never sleeps, drafts in seconds, and is occasionally wrong with total confidence. You would not let that analyst sign the wire transfer. You would happily put ten of them on the team.


## THE WHY: THE EVIDENCE GOES BOTH WAYS

The good evidence here does not come from vendor decks. It comes from randomized controlled trials, the same design used to test medicines.


>>> INSERT FIGURE 2 HERE <<<
File: figure-2-evidence-both-ways.png
Caption: Figure 2. Sources: Harvard Business School and BCG randomized controlled trial, 758 consultants, 2023. Brynjolfsson, Li and Raymond, Quarterly Journal of Economics, 2025 (peer reviewed).


Look at that bottom bar, because most people selling you AI will not put it on the slide. In the same trial that produced the 25% and the 40%, people given an AI assistant were 19 percentage points more likely to get the answer wrong when the task sat outside what the model was good at. They could not see where the edge was, so they trusted it past the edge.

There is a second finding in there worth sitting with. The people who improved most were the ones performing worst to begin with: roughly 43% improvement for the bottom half of performers against 17% for the top half.

So AI is very good at raising the floor. It is not good at telling you when it is out of its depth. You have to plan for both of those at once.

(You have probably heard the claim that 95% of enterprise AI pilots return nothing. It comes from a preliminary MIT working paper that has not been peer reviewed, it defines "failure" narrowly as no quick profit-and-loss impact, and it has drawn fair criticism, including for the slightly awkward fact that the project publishing it also builds the sort of infrastructure it recommends. The direction of travel is right. The precision is not there. We would rather you had the honest version of that number than the viral one.)


## THE WHEN: THREE QUESTIONS, NONE OF THEM ABOUT TECHNOLOGY

1. Can you name the decision?

Not in the sense of "we should look at AI." A real decision, one that comes round every week, currently made on stale or partial information. Which jobs to bid. What price to quote. Which asset gets the crew. Where the money leaked last month.

If you can name it, you have a use case. If you cannot, what you need is a walk around the floor, not a chatbot.

2. Does the data exist, and does it agree with itself?

This pattern is identical in every industry we work in. The numbers that matter sit in four or five systems that were never designed to talk to each other, so every report your leadership sees gets assembled by hand and arrives after the decision it was meant to inform.

Gartner expects organizations to abandon 60% of AI projects that are not supported by AI-ready data. In the same research, 63% of data leaders said they either lack the right data practices or are not sure whether they have them. Putting AI on top of fragmented data does not fix the fragmentation. It produces confident nonsense faster.

3. Is it an AI problem at all?

Often it is not. Most of what executives want from "AI" turns out to be arithmetic on joined-up data: profit per site per day, labor against the revenue it produced, cost against benchmark. Once the plumbing exists those numbers arrive on their own, and the foundation tends to pay for itself before any model shows up.

Save the real AI for the places arithmetic cannot reach. Forecasting. Spotting anomalies. Finding patterns across messy free text. Pricing under uncertainty.

One warning while we are here. If two departments calculate downtime differently, AI will not settle the argument. It will give you the wrong answer with more conviction.

There is one more thing worth knowing before you start.


>>> INSERT FIGURE 3 HERE <<<
File: figure-3-payback-gap.png
Caption: Figure 3. Source: Deloitte, "AI ROI: the paradox of rising investment and elusive returns," 2025 (n=1,854 executives across 14 countries in Europe and the Middle East; self-reported).


Most organizations report reaching a satisfactory return in two to four years, not the seven to twelve months a board expects of a normal technology investment. Only 6% see payback inside a year. Budget your patience accordingly, and make the first project small enough that you do not need much of it.


## THE HOW: WHAT THE SUCCESSFUL FEW DO DIFFERENTLY

The organizations getting real value follow a pattern that is boring, repeatable and very learnable. It helps to start by knowing where projects die.


>>> INSERT FIGURE 4 HERE <<<
File: figure-4-where-projects-die.png
Caption: Figure 4. Measured: S&P Global Market Intelligence, 2025 Voice of the Enterprise (1,000+ respondents, North America and Europe). Forecast: Gartner, 26 February 2025 and 25 June 2025.


Notice we have split those bars. The solid ones are things that happened. The hatched ones are analyst predictions. Anyone who shows you all four as the same kind of fact is doing something to you rather than for you.

Here is the sequence we run.


>>> INSERT FIGURE 5 HERE <<<
File: figure-5-five-gates.png
Caption: Figure 5. Vaiyu Solutions.

comment: this comes very abruptly, and needs to flow better. perhaps this can simply be a single concluding paragraph that summarizes the flow and the value Vaiyu Solutions brings to organizations.

The exits are the interesting part. A good partner should be trying to get you off that path as early as possible, because every gate you exit at is money you did not spend and risk you did not take on. If you make it to gate five, a model has earned its place. Most requests do not get there, and that is a good outcome rather than a failed project.

Two more habits worth stealing.

Own the data, even when you rent the software. Keep the systems that run your business, because they are doing their job. But land a copy of what matters in a foundation you control, connected read-only so nothing writes back to the source. And ask the portability questions before your next software renewal rather than after: live API access, the right to pull your own history in bulk, exit terms in writing. Asked before signature, those are contract terms. Asked afterwards, they are change requests at the supplier's price.

Settle what "working" means up front. Acceptance criteria before development starts, and a measurable business number attached to the outcome. If the result cannot be measured it cannot be scaled, and it will not survive its first budget review.


## WHERE WE COME FROM

Vaiyu Solutions takes AI from architecture into production in industries where it has to be right: healthcare and life sciences, financial services, energy and utilities, manufacturing, research institutions.

Our habits come from places where a wrong answer has consequences. Our team led the largest federated learning study published to date, 71 institutions across six continents training a shared model on scans from 6,314 patients, with no patient record ever leaving its home hospital. It was published in Nature Communications. We have also integrated an imaging model directly into a health system's radiology environment, which took the quantitative measures available to oncologists at the point of decision from a handful per patient to somewhere between 70 and 85, all of it inside the hospital's own perimeter. We are an OpenAI Select Partner, and we would still rather talk you out of a model you do not need.

Show the evidence, keep a person accountable, measure the value. None of that is specific to healthcare. It is just what makes AI work anywhere.


## THE TEST

If you take one thing from this, take the test. Name the decision.

If you can name it, then AI, or quite often just joined-up data and honest arithmetic, probably has a place in your business, and a first project scopes in weeks rather than years. If you cannot name it yet, the honest first step is plumbing rather than models.

And sometimes the right answer really is "not yet." A good partner will tell you that to your face, even when it costs them the sale.
