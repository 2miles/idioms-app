-- PostgreSQL database dump
-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.idioms_examples_test (
    example_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);

ALTER TABLE public.idioms_examples_test OWNER TO postgres;

CREATE SEQUENCE public.idioms_examples_test_example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idioms_examples_test_example_id_seq OWNER TO postgres;

ALTER SEQUENCE public.idioms_examples_test_example_id_seq OWNED BY public.idioms_examples_test.example_id;

CREATE TABLE public.idioms_origin_test (
    origin_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);

ALTER TABLE public.idioms_origin_test OWNER TO postgres;

CREATE SEQUENCE public.idioms_origin_test_origin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idioms_origin_test_origin_id_seq OWNER TO postgres;

ALTER SEQUENCE public.idioms_origin_test_origin_id_seq OWNED BY public.idioms_origin_test.origin_id;

CREATE SEQUENCE public.idioms_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idioms_test_id_seq OWNER TO postgres;

CREATE TABLE public.idioms_test (
    id integer DEFAULT nextval('public.idioms_test_id_seq'::regclass) NOT NULL,
    title character varying(255),
    title_general character varying(255),
    definition text,
    contributor character varying(50),
    timestamps timestamp with time zone
);

ALTER TABLE public.idioms_test OWNER TO postgres;

-- Tracks whether E2E tests are currently running (used for local locking)
CREATE TABLE public.e2e_lock (
    id INT PRIMARY KEY,
    running BOOLEAN NOT NULL,
    updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE public.e2e_lock OWNER TO postgres;

-- Seed row for e2e_lock to initialize it in the "not running" state
COPY public.e2e_lock (id, running, updated_at) FROM stdin;
1	false	2025-01-01 00:00:00
\.

ALTER TABLE ONLY public.idioms_examples_test ALTER COLUMN example_id SET DEFAULT nextval('public.idioms_examples_test_example_id_seq'::regclass);

ALTER TABLE ONLY public.idioms_origin_test ALTER COLUMN origin_id SET DEFAULT nextval('public.idioms_origin_test_origin_id_seq'::regclass);

COPY public.idioms_examples_test (example_id, idiom_id, example) FROM stdin;
1	1	I didn’t want the after effects of involving myself in their drama at the time. Later, when things had calmed down, I told the chef that it was not my circus, not my monkeys. He laughed, and we went back to work.
2	1	All this fuss going on at the moment about the lack of government funding for preschool childcare so mothers can work? Sorry, not my circus, not my monkeys
3	2	The audience watched with bated breath as the magician performed his final trick.
4	2	She waited with bated breath for the results of her medical test.
5	2	With bated breath, the crowd awaited the announcement of the winner.
6	2	The children listened with bated breath to the storyteller’s suspenseful tale.
7	2	He waited with bated breath to see if his job application was successful.
8	3	They said the flight might leave on time, but don’t hold your breath.
9	3	She’s hoping the noisy neighbors will move out, but I wouldn’t hold my breath.
10	3	I’m supposed to get a promotion, but I won’t hold my breath.
11	3	My son promised to clean his room, but honestly, don’t hold your breath.
12	3	Did Mary promise to pay you back tomorrow? Well, don’t hold your breath. She’s notorious for ripping people off.
13	3	They said they’d fix the potholes in front of my house by next week, but I won’t hold my breath.
14	4	Henry, stop, you know what they say about stones and glass houses. 
15	4	I don’t think you should really go there, Anna, those who live in glass houses shouldn’t throw stones. 
16	4	You know that old proverb about glass houses and stones? Well, I think it applies here. 
17	4	I’ve near heard anything more hypocritical. Have they never heard the proverb "those who live in glass houses shouldn’t throw stones" in Washington? 
18	5	I know you don’t like the dress very much, but it was a gift; you should not look a gift horse in the mouth.
19	5	Don’t look a gift horse in the mouth, be grateful for what you have received.
20	5	He gave his old car as a gift; I know its not a great one, but I wouldn’t look a gift horse in the mouth.
21	5	It’s not what you were hoping for, but it’s the best he could afford; I would advise you not to look a gift horse in the mouth.
22	5	If I were you, I wouldn’t look a gift horse in the mouth. Just be grateful that he was kind enough to give you his old watch when you needed one.
23	6	Before committing to make the payment, wait till you receive the money from the bank. Don’t count your chickens before they hatch.
24	6	Though he was leading the race, he had started celebrating even before the finish line, and in the process lost his lead. He had counted his chickens before they hatched.
25	6	You may get the job, but don’t count your chickens before they hatch; wait till you get the offer letter before you throw the party.
26	6	Why not wait till you get the confirmation? Aren’t you counting your chickens before they have hatched?
27	7	It would be better if you applied to several companies instead of just one; don’t put all your eggs in one basket.
28	7	It is wise to diversify your investments across different instruments, as you should not put all your eggs in one basket.
29	7	Why are you putting all your money into one company? Don’t put all your eggs in one basket.
30	7	He was depending heavily on the success of his venture, but when it failed, he was ruined. He realized that he should not have put all his eggs in one basket.
31	7	He was able to recover from his losses because he didn’t put all his eggs in one basket.
32	7	You’d better acquire a new skill; don’t put all your eggs in one basket.
33	7	People who don’t put all their eggs in one basket have shielded themselves from situations of crisis.
34	8	You may not like your job, but don’t quit merely on the hope of finding a better one. A bird in the hand is worth two in the bush.
35	8	I might have got a better offer if I had waited for some more time, but I decided to take the one I had. After all, a bird in the hand is worth two in the bush.
36	8	He decided against selling off his small business for the prospects of starting a bigger one. He realized that a bird in the hand is worth two in the bush.
37	8	Do not put your life’s savings into risky investments in the hope of higher returns. You may lose everything. Don’t you know, a bird in the hand is worth two in the bush.
38	9	I know you think your way is the only way to do things, but there’s more than one way to skin a cat.
39	9	It’s hard to solve this problem; don’t just focus on one solution. Remember, there’s more than one way to skin a cat.
40	9	You should know that you are both right, after all, there’s more than one way to skin a cat.
41	10	I wanted to keep my job offer a secret, but my little brother overheard and let the cat out of the bag.
42	10	The movie trailer was supposed to be a surprise, but a blogger let the cat out of the bag a day early.
43	10	The team had a special strategy for the finals, but an interview with one of the players let the cat out of the bag.
44	10	The kids had baked a cake for their parents’ anniversary, but the smell from the kitchen let the cat out of the bag.
45	10	She had promised not to reveal the gender of her baby, but during a chat, she inadvertently let the cat out of the bag.
46	11	The can of worms was wide open when he asked her about her past.
47	11	I am not opening a can of worms by answering that question.
48	11	To get into that discussion would mean to open a can of worms.
49	11	The family has many can of worms so it is best to not ask them any personal questions.
50	11	The death of the rich man opened a can of worms which was difficult for the police to sort out.
51	11	The doctor had to go through a can of worms to figure out a diagnosis for his problem because he had many complications.
52	11	To sell that house would mean that I would have to speak with my brother and I am not about to open that can of worms.
53	11	Maurice opened a can of worms when she spoke more about her career choices.
54	11	No one wanted to be the part of that project, realizing that it was a can of worms.
208	52	Why do you get so aggressive at the slightest hint of criticism? You seem to have a chip on your shoulder.
55	12	The president has been attacking foreign ministers and even the people in his own party like a bull in a china shop. This has not only led to a lot of criticism but people have started alienating from him.
56	12	I behaved like a bull in a china shop last night. I’m so sorry.
57	12	You are like a bull in a china shop, a complete misfit in a museum.
58	12	My daughter is almost always like a bull in a china shop.
59	12	You need not act like a bull in a china shop. There are better ways to resolve this.
60	12	Tom Roger is like a bull in a china shop when it comes to dealing with her wife’s feeling and emotions.
61	12	Do you really have to behave like a bull in a china shop while I speak with my clients?
62	13	The game app became popular but turned out to be a one-trick pony pretty fast.
63	13	She’s not a one-trick pony; she excels in almost every sport.
64	13	The band is far from a one-trick pony; their new album explores new genres.
65	13	Critics claim that he’s a one-trick pony, good only for action roles. But he’s determined to prove them wrong.
66	13	That software is a one-trick pony; it only converts PDFs to Word documents.
67	13	His cooking skills are no one-trick pony; he can make popular dishes from multiple cultures.
68	13	My favorite author turned out to be a one-trick pony, writing the same old story over and over.
69	13	Don’t underestimate her on the field; she’s not a one-trick pony.
70	13	The media company doesn’t want to be a one-trick pony, so it’s diversifying its product line.
71	15	Several car mechanics are huddled around my vehicle; they are arguing about what is wrong with my truck. This feels like a situation where there are too many cooks are in the kitchen.
72	15	There should only be one person in charge of directing this project, because too many cooks spoil the broth.
73	16	He’ll either be impeached and convicted for an as yet undisclosed violation of ethics, or quit because he can’t stand the heat in the kitchen and knows deep down that he isn’t what America needs — not by a long shot.
74	16	My advice to you, Mayor McQueen, grow a thick skin, try to bridge the gaps and if you can’t stand the heat,get out of the kitchen!
75	17	After two nights of continuous work, I’m running on fumes today.
76	17	The company had been running on fumes lately, so its hardly surprising that they shut down their operations.
77	17	After having partied late into the night, he was running on fumes the next day at work.
78	17	Having traveled for the better part of the previous two days, the team was running on fumes on the day of the match and lost.
79	17	Have you had any rest? You seem to be running on fumes.
80	17	This project has been running on fumes. Its better if we close it.
81	17	Having made all the arrangements single-handedly, he was running on fumes on the day of the event and couldn’t enjoy it.
82	17	Let’s give him a break. He has been running on fumes after the marathon practice session he had today.
83	18	Despite being a highly talented team, they were never successful because they always had a bad apple that disrupted their whole flow.
84	18	You shouldn’t judge the entire book community by the actions of one bad-apple author.
85	18	Our science class was doing so well until a bad apple started causing problems and mixed up all the chemical labels.
86	18	Every family has its bad apple, and ours is definitely my Uncle Joe.
87	18	My son’s coach needs to address the bad apple in the soccer team before his attitude affects the others.
88	18	The company was doing great, but a bad apple in management caused a lot of problems, and half the employees quit.
89	18	Mike was known as the bad apple of the group, a disgraceful person, always causing trouble wherever he went.
90	19	Checking in to remind you that, like the cream always rises to the top, your efforts will shine through.
91	19	He was led by the belief that the cream always rises to the top, so he thanked his mentor for the invite to the prestigious event.
92	19	She didn’t worry about the other applicants because she knew that the cream always rises to the top.
93	19	Something is better than nothing, but let’s strive for excellence because the cream always rises to the top.
94	19	They say in the music industry that the cream always rises to the top, and her hit song is proof of that.
95	19	"Don’t sell yourself short," he advised, reminding his friend that the cream always rises to the top.
96	19	Despite the setbacks, I’m reminded that the cream always rises to the top.
97	19	Her unique approach piqued the interest of her colleagues. The cream always rises to the top.
98	19	You go, girl! Keep pushing because the cream always rises to the top.
99	19	She believed that the cream always rises to the top in any competition.
100	20	The new partners were cut from the same cloth—they had innovative ideas and ambitions for growth.
101	20	While the assistant managers disagreed on style, they were cut from the same cloth in their dedication and hard work.
102	20	Despite coming from very different backgrounds, the scientists found they were cut from the same cloth in their love of discovery and solving complex problems.
103	20	The CEO criticized two executives for not being cut from the same cloth, as their management approaches were incompatible.
104	20	After years of studying together, we realized we were cut from the same cloth and shared many of the same hopes, beliefs, and values.
105	20	A team is never truly cohesive until its members discover they were cut from the same cloth.
106	21	Sally was tired of being called a stick in the mud by her friends just because she refused to drink alcohol. 
107	21	Just because I don’t like roller coasters doesn’t mean I’m a stick in the mud—I like lots of other fun things!
108	22	I hate to rain on your parade, but I think your A in chemistry was actually a clerical error.
109	22	Mom really rained on our parade by chaperoning our school dance.
110	23	Even though you lost the race, every cloud has a silver lining. For instance, the race motivated you to exercise and get back into shape.
209	52	He was not very cared for as a child, and he has a chip on his shoulder about his upbringing.
111	23	We accidentally burned our pizza in the oven. Dinner may have been ruined, but on the bright side, we can find something healthier to eat.
112	24	Would you leave me alone, you jerk? Mess with the bull, get the horns—consider that your one and only warning.
113	25	When I was lost in depression, friends tried to remind me that it’s darkest before the dawn. 
114	25	The economy is in tatters. People want everything to improve right away, but it’s always darkest just before the dawn, so things will get worse before they get better.
115	26	The restaurant owners had the best of everything at one point. But you know what they say, when it rains, it pours. Today they are left with absolutely nothing.
116	26	Sid wanted to get rid of his debts and worked really hard at his job. And as they say, when it rains, it pours. He has been given a great travel opportunity which will pay him enough to take care of everything.
117	26	I completely understand that when it rains, it pours. That is the reason why I save as much of my salary every month as possible.
118	26	She thought it was just something minor and did not go to a doctor. But you know what? When it rains, it pours. She should have got it checked much earlier.
119	26	My team has several new trainees and we now have a new project to manage. Oh boy! When it rains, it really does pour!
120	26	Yesterday, we had almost no customer, but today, it’s getting too hard to handle all, really it never rains but it pours.
121	26	I wonder about the Jack Hoffman, he remained so poor his entire life before he discovered the business of gold mining, it never rains but it pours.
122	27	You’ve had so many chances to get research grants or earn a master’s degree, but you never get around to applying for any of them. You’re going to end up stuck in the same dead-end career for your whole life, if you’re not careful—time and tide wait for no man.
123	28	Mike is a lousy gambler, and he always bets the wrong side, but he won this weekend with that bet on the Eagles game. I guess even a broken clock is right twice a day.
124	28	Normally, you can’t believe a word Suzie says; she’s always spouting disinformation. She got it right today, though, and it looks like even a broken clock is right twice a day.
125	28	I’ve never seen a market correspondent get things wrong as often as Denis Gartman. However, he called the top right this time. I guess even a broken clock is right twice a day.
126	28	Tim never calls it right. He’s the worst judge on the panel. But he got it right this weekend, proving that even a broken clock is right twice a day.
127	29	The passing of the legendary musician was a blow for whom the bell tolls, not only for his fans but also for the entire music industry.
128	29	The tragic accident claimed the lives of several young athletes, whose demise tolled the bell for their families and loved ones.
129	29	In the aftermath of the natural disaster, the authorities launched a massive relief effort, not just for those whose houses were destroyed but for whom the bell tolls — the countless people whose lives were forever altered by the tragedy.
130	30	We finally have the full group assembled, so let’s make hay while the sun shines and get this thing done.
131	30	The skiing conditions won’t be this good for another several months, so let’s make hay while the sun shines.
132	32	I tried to make my grandmother learn how to use a smartphone but it was just like you can’t teach an old dog new tricks.
133	32	The teacher found it exactly like teaching an old dog new tricks when she tried to teach ethics to the naughty boys of his class.
134	32	While dealing with his stubborn child, the teacher refused to give more coaching classes by saying that you can’t teach an old dog new tricks.
135	32	My granny does not like pizza at all, she prefer to eat porridge – really, you can’t teach an old dog new tricks.
136	32	Gian has been a bully guy since childhood – he is not going to give up his habit at this stage of the age because, you can’t teach an old dog new tricks.
137	33	I shouldn’t have opened a business with a relative. Oh, well, hindsight is 20/20.
138	33	Hindsight being 20/20, I would have done things differently in my youth.
139	33	I know hindsight is always 20/20 but if I could do things over I wouldn’t have stopped playing music.
140	35	If you let the kids stay up later on the weekends, they’ll want to do it all the time. Give them an inch and they’ll take a mile. 
141	35	I offered the unhappy customer a refund, and she demanded that I also send out a replacement unit, free of charge. I swear, you give some people an inch and they take a mile! 
142	35	I helped that guy with one thing, and now he thinks I’m, like, his personal assistant. Geez, give some people an inch and they’ll take a mile.
143	36	Oh sure, you can come to the mall with us—the more the merrier!
144	37	I have to go back to the store because I cut the wrong size out of my last piece of material. "Measure twice, cut once" should be my new motto!
145	38	My friend Brian orders takeout food almost every day because he doesn’t know how to cook. Doing this for so long has burned a hole in his wallet. So I decided to give the man a fish (figuratively speaking) by teaching him how to cook.
146	39	I have tried my level best to educate him well, but he is still having a non-serious behavior, you can lead a horse to water, but you can’t make him drink.
147	39	My father always wanted me to become a doctor, but I just wanted to be a fashion designer. It is true that you can lead a horse to water but you can’t make him drink.
148	39	I made all the arrangements but he is still not coming tonight. Well, you can lead a horse to water but can’t make him drink.
149	39	I had advised him not to marry so soon, but he still did this. It’s like you can lead a horse to water, but you can’t make him drink.
150	40	The old sofa at that garage sale wears its age well with a soft, vintage look. Truly, one man’s trash is another man’s treasure.
151	40	Glad to hear about the vintage dress you bought from the thrift store yesterday — one man’s trash is indeed another man’s treasure.
152	40	The artist could turn scrap metal into sculptures, proving that one man’s trash is another man’s treasure.
153	40	For antique dealers, one man’s trash can certainly become another man’s treasure.
154	40	In the world of fashion, one man’s trash is often another man’s treasure, with vintage items being highly sought after.
155	40	What are the odds that someone will see potential in the discarded blueprint? This reminds him that one man’s trash is another man’s treasure.
156	40	My grandma’s old jewelry might not mean much to some, but to me, it’s a perfect example of one man’s trash being another man’s treasure.
157	40	Pro tip: One man’s trash is another man’s treasure, as evidenced by the booming second-hand market.
158	40	With the rise of upcycling, it’s clear that one man’s trash is another man’s treasure.
159	40	Mira has been pitching his idea to no avail. To some investors, though, it was a clear case of one man’s trash being another man’s treasure.
160	41	Since starting my new job, I have been burning the candle at both ends.
161	41	Working and studying at the same time has led to me having to burn the candle at both ends.
162	41	She has been burning the candle at both ends by doing a full-time job and preparing for her International English Language Test exams.
163	41	My younger daughter is obsessed with becoming a painter. That is why she is burning the candle at both ends nowadays.
164	41	To finish this massive work, we must burn the candle at both ends.
165	42	Look, man, your term paper was bad before, and all of your edits are just making it worse—polishing a turd won’t make it better.
166	42	No matter how much you try to polish a turd, it’s still a turd.
167	42	He’s spending a lot of time trying to polish a turd by making that old car look new.
168	43	The only things the new manager has come up with to save the restaurant have been to put lipstick on a pig, but slapping on a fresh coat of paint and making a few repairs will do nothing to address the underlying problems. It looks like they’ve just put lipstick on a pig for this new operating system. It’s still just as buggy and unintuitive as the last one they released.
169	44	So many administrative hurdles have been thrown up along the way that this whole project has been one step forward and two steps back ever since we began!
170	44	Trying to get the law changed has been a frustrating business. It’s a case of one step forward, two steps back.
171	45	My dad always used to say that it ain’t over till the fat lady sings, so let’s not give up on the game yet.
172	45	We may be leading now, but it’s not over till the fat lady sings. The other team can still win, so let’s stay focused.
173	45	They were ready to admit defeat, but I reminded them that the match was only over when the fat lady sings.
174	45	Despite the uphill battle trying to publish her book, Jane held onto the belief that the opera ain’t over till the diva sings.
175	46	Sometimes I wish I weren’t the boss of this company so I could just walk away from all these issues come quitting time. Heavy hangs the head that wears a crown, as they say.
176	47	When it comes to dieting, you have to pick your poison: either cut down on carbs or fat.
177	47	Ring me when you pick your poison. Do you want to go to the movies or the mall?
178	47	Public transport or driving in rush hour traffic — pick your poison.
179	47	You must take a shot and pick your poison: face the boss or your ex?
180	47	He presented me with two contracts and said, "Pick your poison."
181	47	As the pinch hitter of the team, it was his prerogative to pick his poison — whether to play defensively or offensively.
182	47	Between staying in a job you hate and facing unemployment, sometimes you have to pick your poison.
183	47	You must pick your poison in the amusement park depending on what kind of experience you want.
184	47	Between a high-interest loan and selling my car to fund my business, I had to pick my poison.
185	47	Just for giggles, they decided to pick their poison from the wildest rides in the amusement park.
186	48	He should not become the chairman of the committee as he has too many axes of his own to grind.
187	48	When I see him strongly supporting someone who could be his rival, I cannot help but think that he has an axe to grind.
188	48	He has no political axe to grind, he is just concerned about the state of affairs here.
189	48	I think he is gunning for the top job because he has an axe to grind with some of his colleagues.
190	48	Some new reports may be biased because the reporters have an axe to grind.
191	48	What started as a casual discussion flared up into a heated debate because both of them had an axe to grind.
192	48	They have been constantly arguing with each other. They seem to have an axe to grind.
193	49	I heard you’re taking over for Marcy, right? Well, good luck—you have big shoes to fill! 
194	49	Thank you for bringing me on board. I know that I have very big shoes to fill with Mr. Williams gone, but I promise to do my best to live up to his legacy.
195	50	John is very aggressive and outspoken, just like his father. The apple doesn’t fall far from the tree in John’s case.
196	50	Mary has a talent for singing and playing the piano, just like her mother. Indeed, the apple doesn’t fall far from the tree!
197	50	Sam’s mischievousness and love for practical jokes seem to have been inherited from his grandfather. The apple doesn’t fall far from the tree in Sam’s family.
198	50	Lisa’s carefree and adventurous spirit is very similar to her mother’s at the same age, demonstrating that the apple doesn’t fall far from the tree.
199	50	Richard’s attention to detail and perfectionism in his work clearly come from his father, an excellent example of the apple not falling far from the tree.
200	50	My brother Jake has the same enthusiasm and work ethic as our dad, proving once again that the apple doesn’t fall far from the tree.
201	51	Like his brother, he is a chip off the old block, very rude in behavior and stout in physique.
202	51	Jane’s daddy is a great cook, and she is a chip off the old block.
203	51	Stephen is a chip off the old block. He’s a good football player, just like his father.
204	52	He’s always picking up fights with everyone. He seems to have a chip on his shoulder.
205	52	He has a chip on his shoulder for not being born into a rich family.
206	52	She still seems to have a chip on her shoulder about the argument she had with her friend last week.
207	52	He has a chip on his shoulder for not being invited to the party.
210	52	She has a chip on her shoulder about not getting admission into that university.
211	52	One of my colleagues is always arguing with everyone. I think he has a chip on his shoulder.
212	53	All this current school administration does year after year is reinvent the wheel and make us all crazy, as if finals don’t happen at the end of every school year.
213	53	Why recreate an entirely new schedule and reinvent the wheel when the current schedule works perfectly fine?
214	53	There was no sense in reinventing the wheel when perfectly acceptable lessons already existed; all she needed to do was personalize them to her own classroom.
215	53	As regards designing a user interface, it is often best to follow established standards and conventions—don’t reinvent the wheel.
216	54	Those boys could be twins, they are like two peas in a pod.
217	54	Jeffrey definitely has a preferred type of woman that he finds attractive. The last three have been like peas in a pod.
218	54	She piled the kids in the back of the tiny car like peas in a pod and off they went.
219	54	Lisa and her best friend could be sisters, they are as alike as two peas in a pod.
220	54	They’ve hardly been apart since they met. They are always together, like two peas in a pod.
221	54	His beloved wife Wilma was his soul mate and constant companion. They were like two peas in a pod.
222	54	We’re two peas in a pod and I see him as my brother from another mother.
223	54	For many years, Prince William and his younger brother, Prince Harry were two peas in a pod.
224	54	The pair have been described as being like "two peas in a pod" and "the best of friends".
225	54	Just like their mamas, the two boys hit it off like two peas in a pod.
226	54	"Just like two peas in a pod. He’d come up almost every weekend to see her and spend time with her. And he just loved her to death."
227	54	Relationship and compromise are like two peas in a pod.
228	54	He loved his devoted girlfriend Louise. Two peas in a pod, they shared the same sense of humor and zest for life.
229	55	The constant pressure of her personal assistant job felt like a monkey on her back.
230	55	I’ve finally quit smoking; I got that monkey off my back.
231	55	Isn’t it time you address that monkey on your back and talk to your father about what happened that day so many years ago?
232	55	For years, that secret of what he did felt like a monkey on Andy’s back.
233	55	The burden of being a hero to the world was like a monkey on his back.
234	55	Dealing with her mother’s addictions was a constant monkey on her back for her entire childhood.
235	55	Dave’s finally in therapy, addressing the monkey on his back.
236	55	For Lily, her crippling debt was the monkey on her back she wished she could shake off.
237	56	When the business was sold, its sphere of influence went from being a big fish in a small pond to a tiny player in a much larger developing market.
238	56	Sarah’s basketball skills made her the neighborhood’s star player, solidifying her status as a big fish in a small pond.
239	56	Upon graduating high school, John became the editor-in-chief of the local newspaper, feeling like a big fish in a small pond.
240	57	Her crazy mother said that being so lazy, Megan is going to be rich one day for sure and without any hard working job. Come on, when pigs fly!
241	57	I asked my boss if I could go on a two month vacation, he said yes, when pigs fly!
242	57	I think he’ll pay you back your money – when pigs fly.
243	57	"I think I’ll start working on my project from tomorrow." "Yes, and pigs might fly."
244	57	"Do you think our team will win the competition?" "Yes, flying pig."
245	57	John asked Sarah whether she would go to the movies with him, Sarah replied that would happen when pigs fly.
246	57	He plans to clean his house every week, but he will probably do it only when pigs fly.
247	57	"Someday, I’ll become a successful actor." "And pigs might fly."
248	57	I’ll join your physics classes when pigs fly.
249	58	I guess, she will forgive you when hell freezes over.
250	58	I am going to give up eating burgers, only when hell freezes over.
251	58	Ruth had broke my heart – now I will talk to her when hell freezes over.
252	58	Olivia is very arrogant and stubborn she will apologize when hell freezes over.
253	58	Do you think that all the members of our family may be reunited? Yes, When hell freezes over!
254	59	In a bid to gain independence, she agreed to get married early, not knowing she was jumping out of the frying pan into the fire.
255	59	Moving from my old school to this one is like jumping out of the frying pan into the fire.
256	59	I wanted to fix the leakage but being so old the pipe was straight out of the frying pan and into the fire.
257	59	Liza started shouting at me in public when I went to apologize. I was like out of the frying pan into the fire.
258	60	I can’t believe that you are upset because I was late. That is the pot calling the kettle black.
259	60	Peter called me a liar! That is the pot calling the kettle black.
260	60	"How can you blame me like that? huh! Pot calling the kettle black."
261	60	All politicians blame each other and tell themselves good, it’s like pot calling the kettle black.
262	60	Stop accusing each other – you are both responsible for this accident. Pot calling the kettle black!
263	61	Drug addiction is often a boiling frog, as many people don’t see their addiction as problematic until it has consumed their lives. 
264	61	Environmental issues are a boiling frog that climate change deniers will not accept until the earth is polluted beyond repair. 
265	61	Once people have cancer, they want to make all kinds of lifestyle changes, but it’s too late. By that point, their neglected health is a boiled frog.
266	63	When Sara told Sam that there is a ghost living next to their room, he changed the room like a bat out of hell.
267	63	Yesterday Kevin was driving like a bat out of hell.
268	63	My toy plane flies here and there like a bat out of hell.
269	63	DHL delivered the goods to me like a bat out of hell.
270	63	She rushed into the shopping mall like a bat out of hell and collected many discounted products.
271	63	Like a bat out of hell, Nick came to us and asked for help.
272	63	The factory caught fire and its workers were running and trying to escape like a bat out of hell.
273	64	With corruption and malpractices everywhere, the political leadership seem to be going to hell in a hand basket.
274	64	The security arrangement at the stadium was pathetic and the whole place went to hell in a hand basket as the people in charge looked on.
275	64	The company was rapidly going to hell in a hand basket when the chairman and some top officials were accused of fraud.
276	64	The fortunes of the club did not change with a change in management and soon they were going to hell in a hand basket.
277	64	Many believe that if that candidate wins the elections, the country would soon be going to hell in a hand basket.
278	64	The healthcare system in this city is going to hell in a hand basket as the people responsible are busy blaming each other.
279	64	With mounting debt and dwindling operations, the company is going to hell in a hand basket.
280	65	By accepting two part-time jobs, he is clearly biting off more than he can chew.
281	65	It feels like I bit off more than I could chew when I promised to complete this worksheet in one day.
282	65	I would like to suggest you that don’t bite off more than you can chew by accepting the job in Alaska while winters.
283	65	The anaconda bit off more than it could chew. It just killed a big cattle but couldn’t swallow it.
284	65	I am sure, she is biting off more than she can chew by promising to solve the difficult puzzle in few minutes that I couldn’t since last three days.
285	66	The prime minister probably realizes that the bigger they are the harder they fall. So he has been very cautious about all of his plans and policies up till now.
286	66	I know that within the criminal world, the bigger they are the harder they fall. This family has been in business for the longest time and now look at how they have ended up.
287	66	His family business was the top in the country and they had several brands running successfully. But then the bigger they are the harder they fall. They have slowly started closing things out and intend to keep minimizing.
288	66	My uncle very well knows that the bigger they are the harder they fall. So he never really talks about his success and has kept the virtue of humility alive in him.
289	66	Owing to the recession in the global economy, she has limited her business strategies. She is quite aware of the fact that the bigger they are the harder they fall.
290	66	This European country has seen some amazing times. But then the bigger they are the harder they fall, they are now running off the alms that the rest of the European Union are willing to provide to them.
291	67	Wow, all that beer has left me feeling terrible this morning. The only cure is the hair of the dog, I guess!
292	67	After a wild night out, John decided to have a hair of the dog to help get rid of his pounding headache.
293	67	“I know it sounds counterintuitive, but sometimes a hair of the dog can actually help you feel better after a night of drinking,” she told me with a wink.
294	67	Despite feeling terrible, Amy ordered a Bloody Mary at brunch, hoping that the hair of the dog would work its magic and fix her hangover from the night before.
295	67	My grandpa always swore by the old saying, “hair of the dog that bit you,” so he would have a glass of whiskey every morning after drinking it the evening before.
296	67	I hesitated before taking a sip of the strong mimosa, wondering if the hair of the dog would really help me feel better before my wedding or just prolong the inevitable hangover.
297	70	My grandmother advised me to be careful about making new friends because all that glitters is not gold.
298	70	After being cheated by many handsome guys, she finally realized that all that glitters is not gold.
299	70	I know that Christie is a beautiful girl but don’t forget all that glitters is not gold.
300	70	Mark recently bought an attractive wrist-watch, and it stopped after few weeks. All that glitters is not gold.
301	70	I never prefer to wear a bling rather I like being relaxed — all that glitters is not gold!
302	71	I found an old coin while gardening. I think it’s a diamond in the rough.
303	71	You don’t know about Olivia; trust me, she’s a diamond in the rough.
304	71	Emma is going to be an international artist one day. She is a real diamond in the rough.
305	72	The chief of security said that his team would leave no stone unturned in nabbing the miscreants.
306	72	He said he will leave no stone unturned in order to prove her innocence.
307	72	The doctor said he will leave no stone unturned to find a cure for his illness.
308	72	The researcher left no stone unturned in her search for the ancient manuscript.
309	72	The police said they would leave no stone unturned in their search for the stolen jewelry.
310	72	Both sides agreed to leave no stone unturned in their efforts to end the dispute.
311	72	They promised that they will leave no stone unturned to find the solution to the problem.
312	72	We will leave no stone unturned to find out who did this.
313	73	The senior debate turned into a no-holds-barred argument about the cafeteria menu.
314	73	She gave a no-holds-barred performance on stage as the Juliard recruiter watched with admiration.
315	73	His no-holds-barred attitude got him far in the business world, but his family life suffered for it.
316	73	They had a no-holds-barred approach to solving the plumbing problem.
317	73	“In this competition, it’s no holds barred,” announced the host.
318	73	The meeting was a no-holds-barred discussion on company ethics and workplace relationships.
319	73	Their love was no holds barred, wild, and free.
320	73	I promise this is a no-holds-barred zone; say what you really think.
321	73	His no-holds-barred review of the restaurant went viral for all the wrong reasons.
322	73	If you want to win this game, it’s got to be a no-holds-barred effort.
323	74	Janet quitting her job because her ex started working there is a classic example of throwing out the baby with the bathwater.
324	74	People who leave old friends because of minor issues are throwing out the baby with the bathwater.
325	74	Amanda’s habit of making hasty decisions makes her commit the error of throwing out the baby with the bathwater most of the time.
326	74	Just because you don’t get what you want from people does not mean you should end communication with them and therefore throw out the baby with the bathwater.
327	74	I regret cutting off my siblings after the quarrel with my parents because that means I threw out the baby with the bathwater.
328	75	When he moved out of the house, he took along everything but the kitchen sink.
329	75	They were going away for only a few days, but they packed everything but the kitchen sink.
330	75	Have a look at this website. It talks of everything but the kitchen sink.
331	75	When we were going on a vacation, my wife wanted to take everything but the kitchen sink.
332	75	Our nearby store is a one-stop shop. You’ll find everything but the kitchen sink in there.
333	75	When he and his colleague went on a trip to a remote place for work, he insisted on taking everything but the kitchen sink along.
334	76	For entrepreneurs, slow and steady wins the race
335	76	Then there is the anecdote I turned to as a child whenever I felt overwhelmed — “ slow and steady wins the race” — which helped me overcome many an obstacle.
336	76	For Mitsubishi, slow and steady wins the race as it debuts the redesigned Eclipse Cross
337	77	I’ve always felt that environmentalism and human rights are actually two sides of the same coin. 
338	77	Those two issues are just two sides of the same coin, so you can’t really deal with them separately. 
339	77	Absenteeism and disrespect are just two sides of the same coin, as far as the headmaster is concerned.
340	78	I know you feel unsatisfied with your life at the moment, but we all have to play the hand we’re dealt. Just keep working hard and things are bound to improve!
341	78	I never asked to be responsible for the business, but I’m going to play the hand I was dealt.
342	79	She tried to live by the motto "when life gives you lemons, make lemonade."
343	79	He was so optimistic that he should have "when life gives you lemons" tattooed on his forehead.
344	79	Although I was devastated when I was made redundant from my job, I used the time to go back to college and retrain. A case of if life gives you lemons and all that.
345	79	My grandfather lost his job due to the coronavirus, but he decided to keep busy and active. He says, "when life gives you lemons, make lemonade."
346	79	When life gives you lemons, make lemonade. And when life gives you millions of apples, make jam.
347	79	Now when life gives you lemons, you can quickly and simply make so many lemony drinks and dishes.
348	79	If life gives you lemons, make lemonade. When one door shuts, another one opens. So be optimistic.
349	79	When life gives you lemons, you make lemonade out of it – the saying fits quite aptly for my father who knows how to make the most out of everything.
350	79	Why not try something more positive? As they say, when life gives you lemons, make lemonade.
351	79	My hope is that they look at this moment in time as a learning lesson to life and take away that when life gives you lemons – you make the best lemonade possible.
352	80	Look, we’re just going around in circles at this point. How about we just put a pin in it and come back to it another time? 
353	80	I have more to say but I have to take this call, so let’s put a pin in it for now.
354	81	Sarah really wanted that job, so she said the signing bonus was really just the cherry on top.
355	81	Can you help me with this project? Please, pretty please with a cherry on top? 
356	81	Having all of you here for my birthday has really been wonderful. This gift is the cherry on top.
357	82	Everyone expected him to do well in the exams. Getting first rank was the icing on the cake.
358	82	He was happy to have his first book published. All those congratulatory messages and fan-mail that came in were the icing on the cake.
359	82	The sportsman was already on a high after having won at the competition, the frosting on the cake was when the government announced a huge cash reward for is achievement.
360	82	He was already happy with his pay hike, the icing on the cake came when he received a large bonus.
361	82	Winning the race was a feat in itself, creating a world record was the icing on the cake.
362	82	The hotel was very nice and we enjoyed our stay there. The icing on the cake was when they gave a complimentary voucher for a two day stay which we could redeem on out next visit.
363	82	The fact that my car broke down was just the icing on the cake. My day had already been a disaster.
364	82	After the nightmare of a party, my son vomited everywhere. It was the icing on the cake.
365	83	My younger brother got far more stuff from my parents when we were kids because the squeaky wheel gets the grease.
366	83	The little brat got me to buy him two more presents on the way. It works for him because the squeaky wheel gets the grease.
367	83	This lawyer is more successful probably because the squeaky wheel gets the grease.
368	83	In a competitive industry such as this one, you should know that only the squeaky wheel gets the grease.
369	83	She got the promotion even though there were two more deserving candidates because the squeaky wheel gets the grease.
370	84	Individuality is not welcome at that company. The nail that sticks out gets hammered down.
371	84	John is always trying to stand out from the crowd, but he needs to remember that raised nails get pounded down.
372	85	I love how your face feels after you shave—it’s as soft as a baby’s bottom! 
373	85	This is my favorite blanket to get snuggled up in at night. It’s soft as a baby’s bottom, and it keeps me nice and warm in bed. 
374	85	This kitten is just adorable—and soft as a baby’s bottom!
375	86	I want to complete this report by today, come hell or high water.
376	86	He said he will be going for the trip, come hell or high water.
377	86	His boss said he wanted the project completed by the end of the week, come hell or high water.
378	86	She said she had planned her vacation since a year and she would be going for it, come hell or high water.
379	86	He said he would leave by evening, come hell or high water, since he had an appointment with his dentist and he did not want to miss it.
380	86	My friend has started up a new company and he wants it to be successful, come hell or high water.
381	86	He said he wanted to shift into his new home by the end of the year, come hell or high water.
382	86	I will be there for your wedding, come hell or high water.
383	87	I hate my job but cannot quit owing to my economic condition. I’m stuck between a rock and a hard place
384	87	I can’t make up my mind whose side I am on; I’m caught between a rock and a hard place
385	87	He was caught between a rock and a hard place. If he accepted the offer, he would have to work long hours with low pay, if he didn’t, he would lose his livelihood.
386	87	Our company was caught between a rock and a hard place. If we made the deal, we would make a monetary loss and if we didn’t, we would lose our reputation.
387	87	They are both my brothers! I can’t go against either of them. I am stuck between a rock and a hard place.
388	88	It always makes me uncomfortable when John starts going into all his personal problems whenever our friends get together. I just wish he wouldn’t air his dirty laundry in public like that. 
389	88	People have an unnatural fixation on the personal lives of celebrities, but I don’t see why they should be expected to air their dirty laundry in public. 
390	88	I didn’t talk about my divorce at the dinner party because a lady does not air her dirty laundry in public.
391	89	I have come to know that Eric has a skeleton in his cupboard.
392	89	It is always possible to find a skeleton in the closet when you dig into family history. Our great, great, grandfather had been in prison for bank robbery.
393	89	Jane had been married to Matt for eight years before she found out about the skeleton in his cupboard. His teenage son turned up one day out of the blue, and she didn’t know he had other children. What a shock!
394	89	The party asked the candidate if he had any skeletons in the cupboard that could potentially derail the campaign.
395	89	People in this area are mainly corrupt, self-centered, and many with a skeleton in the closet.
396	89	She refuses to speak up as she is afraid of the skeleton in the closet.
397	89	Emma has a skeleton in the closet. After a fight with her husband, she once hooked up with his friend, William.
398	90	Sebastian using all his savings to buy blue chip stocks is definitely skating on thin ice.
399	90	Going into a business without carrying out proper studies is like skating on thin ice.
400	90	I feel their decision to get married after meeting just a week ago is like skating on thin ice.
401	90	Because of his explosive temper, you always feel like you are skating on thin ice when around him.
402	90	Amanda decided to skate on thin ice by quitting her day job to pursue her passion of wildlife photography.
403	90	Rather than skate on thin ice by investing in risky ventures, people should hire a business and financial expert first.
404	91	He used to be one of the most successful financial advisers on Wall Street, but he kept flying too close to the sun with those high-risk, high-profit investments. Now he’s bankrupt. 
405	91	The attorney was determined to put an end to the corruption in the state, but she flew too close to the sun when she opened an investigation into the governor’s affairs. 
406	91	That junior executive challenged the CEO in front of the board? Hoo boy, he’s flying too close to the sun.
407	92	My father told me never to toot my own horn.
408	92	To be celebrated, you have to toot your own horn.
409	92	Toot your own horn, because I am not going to toot it for you.
410	92	It’s good to toot your own horn for the reason that occasionally you required to be your finest spokesperson.
411	92	Julia always keep blowing her own horn in front of everybody.
412	93	He received a pat on the back from his boss from the new project that he landed.
413	93	My dad’s idea of a pat on the back was always to let us eat dessert before our meal.
414	93	You single-handedly organized the fundraiser, Julie. It has been a massive success and you can give yourself a pat on the back.
415	93	Do you think that you deserve a pat on the back for telling the whole company that I was the one who broke the printer?
416	93	Father gave son a big pat on the back and a big congratulation after the win.
417	93	The coach was surprised by unexpected victory and gave a pat on the back of the team.
418	93	For all that you did, you deserve more than just a pat on the back.
419	93	Don’t pat yourself on the back so early; you have to complete several similar works yet.
420	93	Give yourselves a pat on the back for what you did.
421	93	You guys deserve a pat on the back for the services you provide, day and night.
422	94	I think the kids would visit you more if you were nicer to them. You catch more flies with honey than vinegar, you know. 
423	94	A: "Half my team just told me they are quitting!" B: "Well, maybe they wouldn’t leave if you didn’t scream at them every time something went wrong. After all, you can catch more flies with honey than with vinegar."
424	95	You know you can kill them with kindness instead of shouting back, right?
425	95	My mom always kills people with kindness, even when they’re super rude to her.
426	95	I killed them all with kindness and walked away with my dignity intact.
427	95	Don’t worry about Adam. He’s killing them with kindness, no matter how harsh they are.
428	95	Mary always kills her critics with kindness.
429	95	Despite the tension between the firm and the clients, she managed to kill them with kindness.
430	95	How you killed them with kindness at the meeting was truly commendable.
431	95	Killing them with kindness is his mantra, and he’s proven it works.
432	95	The manager kills any complaints with kindness, making it hard to stay mad.
433	95	She’s killed them with kindness so often that they’ve just stopped being mean to her altogether.
434	96	No, don’t hit him back, Tommy! An eye for an eye makes the whole world blind. 
435	96	I wish more people in power would preach that an eye for an eye makes the whole world blind. 
436	96	I know you’re really upset with Bailey, but starting equally heinous rumors about her won’t solve anything. An eye for an eye just makes the whole world blind.
437	97	A: "Oh please, Dave’s a fool, and the only reason he has any power at all is because he can do lots of odd jobs that the other people around here can’t." B: "Wow, I guess it’s true what they say—in the land of the blind, the one-eyed man is king."
438	98	I’ve thought about going back to college but I feel like that ship has sailed.
439	98	We bought a different house because by the time we decided on the other one, that ship had already sailed.
440	98	You better propose to your girlfriend before that ship has sailed.
441	98	By the time my boss recommended me for the position that ship had sailed.
442	98	I quit my job and am going for my dream of playing professional tennis before that ship has sailed. 
443	98	Sorry but that ship has sailed and we’re no longer accepting applications.
444	98	We desperately wanted a baby but we’ve finally decided that ship has sailed and won’t try another round of IVF.
445	99	As Bouye arrived Chris Harris, Jr. departed for L.A., like two ships passing in the night.
446	99	Like ships passing in the night, the Trump administration and the government of California are cruising in opposite directions on health-care spending.
447	99	According to Selene, the two were "ships passing in the night" as they pursued their separate careers.
448	99	We don’t see enough of each other, we’re like ships that pass in the night, but it works.
449	100	I totally believe that the pen is mightier than the sword and will continue to write about my honest opinions even if it irks a few.
450	100	If our ancestors had not believed that the pen is mightier than the sword then we probably would have not been here now.
451	100	This newspaper works on the belief that the pen is mightier than the sword.
452	100	My mother has taught me that the pen is mightier than the sword and that I needn’t be afraid of anyone when I work on such writing pieces.
453	100	You talk about the pen being mightier than the sword but then how did the goons manage to get into the journal’s office and shoot so many people in broad day light.
454	100	The journalist took her last breath because of coving this issue but proved to the world that eventually it is the pen that is mightier than the sword.
455	100	After the mass killings at the newspaper office, there is a protest which is happening in the city declaring support to the paper and proving that the pen is mightier than the sword.
456	101	Intelligence is a double-edged sword. Things may come easy to you, but people will always expect more. 
457	101	This meeting is a double-edged sword—it’s a great chance to get the firm wider exposure, but we’re just not prepared enough for it. 
458	101	Going back to school was a double-edged sword for Pam. On the one hand, it widened her career prospects, but, on the other hand, she was in a lot of debt when she graduated.
459	102	A: "Are you going to watch the big game tonight?" B: "Nah, my team’s not playing, so I don’t have a dog in the fight." 
460	102	A lot of people think the tax proposal only affects large multinational corporations, but many small business owners will end up having a dog in the fight. 
461	102	You don’t have a dog in the fight, so why do you care about the outcome of this lawsuit?
462	103	I just think it’s crazy that Susan and Jonathan let their children dictate the terms of the house like that. They have got to lay down the law—spare the rod and spoil the child.
463	104	I was worried losing his job was going to trigger his depression, but it seemed to roll off him like water off a duck’s back. 
464	104	I envy my sister because any criticism or judgment is like water off a duck’s back to her.
465	105	A: "I’m just not sure if college is the right choice for me." B: "I can understand that. It’s a lot of time money, and hard work. You’ve got to be sure that the juice is worth the squeeze."
466	105	You robbed a convenience store for a few thousand dollars, and now you’re facing 15 years in prison. Was the juice worth the squeeze?
467	106	I’ve tried everything to get my toddler to eat vegetables, but you can’t get blood from a stone.
468	106	I give up. Good luck trying to get Dad to give you the money. You can’t get blood from a stone.
469	106	If you think I’ll give you the information you’re looking for, you’re sorely mistaken! You can’t get blood from a stone!
470	107	The candidate did not look very intelligent, but you can’t judge a book by its cover.
471	107	The hotel looked attractive from outside, but the rooms were damp and not well maintained. You can’t judge a book by its cover!
472	107	Do not form opinions of a persons character by looking at his appearance. You can’t judge a book by its cover.
473	107	At first we did not want to go into the restaurant as it looked small and cramped; but the food was delicious – we realized that you can’t judge a book by its cover.
474	107	The car was small and looked unsuited for a long trip, but packed a lot of power and was very solid. You can’t judge a book by its cover.
475	107	That man may look very small and insignificant, but don’t judge a book by its cover – he’s a very powerful man in his circle.
476	108	I had such a great time in college, but I’m sure it won’t feel the same at all when I go back for my reunion. You can’t step in the same river twice. 
477	108	Look, the romance we shared was nice when we were younger, but you can’t step in the same river twice. We’re different people now.
478	109	Rather than take control of his own fortune, he instead left it to the discretion of his advisors, preferring to whistle it down the wind and enjoy the life he had.
479	109	I gave him my love and loyalty, and he simply whistled it down the wind. They are given all manner of opportunities, but most whistle it down the wind in the end.
480	110	“The general consensus is you can stick a fork in it,” Clarke said.
481	110	“I’ve learned many times to never say, ’Stick a fork in it! Winter is done!’” meteorologist Bri Eggers said.
482	110	For its fourth trip into the Toy Story sandbox, Disney has decided to stick a fork in it.
483	110	CityBike is done, too done to bother with the vacuous “stick a fork in me” idiot-oms that pass for “writing” in an alarming number of so-called publications in this modern age of empty-headed echo-chamberism.
484	111	Oh, your goose is cooked if Mom finds out you skipped school, bro.
485	111	Jane’s goose was cooked when she missed the project deadline and failed to submit her manuscript on time.
486	111	If we don’t finish this assignment by Friday, our goose is cooked.
487	111	The moment the boss saw the massive error in the report, Tom knew his goose was cooked.
488	111	Once the secret was out about the affair, Anna’s goose was cooked.
489	111	If the teacher catches you cheating, your goose is cooked for the rest of the year.
490	111	The moment he hit the mailbox with his father’s sports car, he knew his goose was cooked.
491	111	When the other team scored the third goal with only seconds left in the game, we knew our goose was cooked.
492	111	If I don’t get this stain out of my mom’s white rug before the party ends, my goose is cooked!
493	111	When she saw the spilled paint on the new flooring, she knew her goose was cooked.
494	113	The ability to read the news for free from countless websites on the Internet has dealt a huge blow to the newspaper industry. After all, why buy a cow when you can get milk for free?
495	113	There are myriad reasons why I don’t want to get married, but my girlfriend thinks my stance boils down to "Why buy a cow when you can get the milk for free?"
496	114	If you don’t want any trouble with your boss, then stop rocking the boat.
497	114	We already have too much homework; let’s not rock the boat and get more!
498	114	Dad said we could play outside before doing homework. Let’s not rock the boat by asking him to do our homework for us!
499	114	Yesterday, I was sent to my principal’s office because my teacher said I was rocking the boat.
500	114	John smirked because he knew his decision would rock the boat.
501	114	The government asked the Prime Minister not to take firm action against protesters as it certainly doesn’t want anything to rock the boat just before the election.
502	115	I wasn’t pointing fingers, but if the shoe fits, wear it.
503	115	You seem offended by the passing comment I made, but if the shoe fits…
504	115	Jane told Sarah that if the shoe fits, she should consider the feedback about her behavior at work.
505	115	He didn’t like being called careless, but if the shoe fits, he needs to change.
506	115	They always say, “If the shoe fits, wear it,” but sometimes it’s hard to admit our flaws.
507	115	She smirked, “I didn’t name anyone, but if the shoe fits, lace it up!”
508	115	Some feedback can be hard to digest, but if the shoe fits, strut with it.
509	116	They say it’s not a tax, but come on—it’s an annual financial contribution determined by our yearly income. If it looks like a duck and walks like a duck, it’s a duck.
510	116	A: "They say that they’re just reorganizing the department, but it seems an awful lot like they’re getting ready for a round of mass layoffs." B: "Well, if it looks like a duck and walks like a duck…."
511	117	So one spends the benignly bland first hour of the film waiting patiently for the other shoe to drop.
512	117	Often in relationships, we are waiting for the other shoe to drop.
513	117	"My heart is constantly pounding, just kind of waiting for the other shoe to drop," Hudson said—meaning, she’s dreading the day her mother gets sicker and dies.
514	117	Any faltering in employment would be the other shoe to drop, given signs "of protracted weakness in investment spending, manufacturing production, and exports" that have emerged already
515	118	The lawyer always thought that the grass is greener on the other side and left his profession to become an MBA graduate. Guess what? He is still struggling to find a job.
516	118	I often think that the grass is greener on the other side but then start counting my own blessings immediately.
517	118	You cannot possibly want to leave your job because you think you can become a singer. The grass is always greener on the side.
518	118	The rich man has plenty of diseases to fight with. You can start being grateful for what you have because the grass always looks greener on the other side.
519	118	I went to check the prospects out because the grass looked greener on that side but did not take up the business opportunity she offered.
520	119	The team is divided into people from the same region batting against each other. Birds of a feather flock together.
521	119	The lawyers who attended the seminar were like birds of a feather flocking together. They have not even spoken to anyone outside their group.
522	119	Hey, Mom, I want to visit my grandmother’s house. I want to play with kids there. You know, birds of a feather flock together.
523	119	I love to talk to people who know about computers. Do you know why? Because birds of a feather flock together.
524	119	Every evening, many drinkers get together in a bar near our home. You know, birds of a feather flock together.
525	120	When you inquire about special benefits for senior employees, remember that what’s good for the goose is good for the gander, so ask about benefits for the junior staff, too.
526	120	If my colleague is allowed to work from home, then, according to the principle of what’s good for the goose is good for the gander, I should be allowed to do the same.
527	120	After witnessing the equal treatment of all members in the team meeting, I rest my case that what’s good for the goose is indeed good for the gander here.
528	120	She insisted on paying for dinner, saying, "What’s good for the goose is good for the gander."
529	120	The company’s decision to extend the work-from-home policy to all employees made my day. What’s good for the goose is good for the gander.
530	120	The idea that what’s good for the goose is good for the gander does resonate with me, as it underlines the need for fairness in all aspects of life.
531	120	If he is praised for his assertiveness, then what’s good for the goose is good for the gander — she should be recognized for her assertiveness, too.
532	120	If politicians can spend on lavish travel, then surely what’s good for the goose is good for the gander — citizens should be entitled to basic amenities.
533	120	The last straw was when he realized that what’s good for the goose is good for the gander wasn’t applicable at his workplace.
534	120	You can rest assured that I firmly believe in the notion that what’s good for the goose is good for the gander.
535	121	The admissions in this college get filled in very early. If you really want to enroll your son here then you should remember that the early bird catches the worm.
536	121	I am usually among the first people to bid for such construction contracts since all my documentation is complete and I firmly believe that the early bird catches the worm.
537	121	I had told you that only the early bird catches the worm in this organization. Why did you wait for the last minute to send your application out? The seat is already taken now.
538	121	She got the position because the early bird catches the worm.
539	121	I got to watch the movie in spite of there being a tremendous rush because the early bird catches the worm.
540	122	As Eliza was in good spirits that morning, Andy decided not to bring up the argument they had last night. It was best to let sleeping dogs lie.
541	122	Since my manager did not ask me anything about me coming late that day, I did not speak to him about it – it is best to let sleeping dogs lie.
542	122	Its not that the two parties have finally agreed over the issue, its just that they have let sleeping dogs lie and things continue as they are.
543	122	We know that we would never reach an agreement over this matter, so its better to let sleeping dogs lie and not discuss it anymore.
544	122	Further investigations into that matter would surely bring to light a lot of controversial decisions, so past governments have just let sleeping dogs lie.
545	122	I wanted to tell her what I thought, but then I decided to let sleeping dogs lie.
546	123	John said to his brother, " You better bring your car to the shop while it’s still running, because a stitch in time saves nine".
547	123	The timely investigation could be prevented the major malfunction in computers. Someone truly said that a stitch in time saves nine.
548	123	Resolve a small problem on time may prevent a big trouble it’s like the old saying "a stitch in time saves nine".
549	123	It seems that something wrong with my car, it’s better to get its check-up as a stitch in time saves nine.
550	123	There is an old saying that a stitch in time saves nine and I think it’s better to compromise earlier instead of dispute with your neighbor.
551	123	Prime Minister summed up the speech in the saying "a stitch in time saves nine".
552	124	I know you’re shocked that that dopey kid got a better grade than you, but hey, every dog has its day.
553	124	A: "Greg is an idiot—how could they possibly give him the promotion?" B: "Well, every dog has its day."
554	124	Hey, we bid unsuccessfully on 25 houses before getting into this one. Hang in there—every dog has its day.
555	125	Al-Zawahiri’s death reveals an eternal principle of life and a profound principle that all of us for our own benefit ought to remember, namely this: "You reap what you sow."
556	125	Last month, Ms. Donovan described the people involved in her son’s death as a “pack of monsters” and expressed a wish that they would “reap what they sow.”
557	125	There is no worse tyranny than anarchy. Sadly, Portland and other like-minded urban environments will continue to reap what they sow.
558	125	There’s a constant push and pull between wanting to do something that will produce immediate results and biding your time and waiting to reap what you sow.
559	125	The adage goes that you reap what you sow. So, what better way to use the extra hours than to plant vegetables? Gardening is fun and relaxing because it allows people to connect with nature. Plus, it’s good for the body and mind too.
560	126	I’ll keep drawing pictures on the sidewalk with chalk until the cows come home.
561	126	Let’s build the biggest sandcastle ever, and we’ll keep adding more towers till the cows come home.
562	126	We can swing on the swings at the park until the cows come home.
563	126	I’ll tell you stories about magical kingdoms till the cows come home, but you have to promise not to fall asleep.
564	126	She said she’d wait for him to apologize when the cows come home, but it seems like he’s not planning to anytime soon.
565	126	We can keep on arguing about this till the cows come home, but it won’t solve anything.
566	126	At the pace you are going, you won’t finish the project till the cows come home.
567	126	You can keep on trying to convince me until the cows come home, but I won’t change my views.
568	126	You can keep reading about investing until the cows come home, but you won’t achieve anything unless you actually start investing.
569	126	We can talk about all that’s wrong until the cows come home, but unless we act on them, there will not be any improvement.
570	127	After years of exploiting others, his wealth vanished overnight, and the chickens came home to roost.
571	127	After years of neglecting his health, the doctor warned him that his unhealthy lifestyle would make the chickens come home to roost eventually.
572	127	The CEO couldn’t avoid the scandal; the chickens were coming home to roost, and he had to face the consequences.
573	127	He cheated his colleagues, but now, as his business crumbled, it seemed the chickens were finally coming home to roost.
574	127	Despite his attempts to hide his past, the truth emerged, and the chickens came home to roost. Years after his dishonesty, his reputation suffered as the chickens came home to roost.
575	127	Ignoring warnings about climate change, the city faced devastating floods — the chickens had come home to roost.
576	127	She realized that her lies had caught up with her; the chickens were coming home to roost, and she had to own up to her mistakes.
577	128	I just feel like he missed the forest for the trees on this project, getting hung up on the most mundane details at the expense of our overall productivity. 
578	128	If you really can’t tell that the president’s actions are all working toward the greater good of the country, then you’re missing the forest for the trees.
579	129	My mother always told us that when in Rome, do as the Romans. That is how today we are able to get along with any kind of people.
580	129	I have tried when in Rome, do as the Romans but it really does not suit my personality.
581	129	You will have to speak with the Asian kids at school because when in Rome, do as the Romans. You are in their land and have to learn to live with it.
582	129	Having traveled so many countries, the only advice that this author regularly gives out is that when in Rome, do as the Romans.
583	129	I didn’t quite understand when in Rome, do as the Romans at first but when I started copying their cultural beliefs they gave me a lot more respect.
584	129	While I would like to stick with when in Rome, do as the Romans; I also know that that I can shape the internal environment of this company according to the company’s goals and mission.
585	130	If I go north or south, I will turn up at the same location. It is six of one, half dozen of the other.
586	130	I am going to have six of one, half dozen of the other of those donuts.
587	130	We can go to the shopping mall first or at the festival. It is six of one and half a dozen of the other.
588	130	It does not matter that we take the bridge or the road; we will reach on time because it is six of one and half a dozen of the other.
589	131	Lesser known is his role hosting a benefit for the destitute and hungry, a party that’s homemade and from the heart, a tad surreal and in synch with the spirit of old New Orleans six ways from Sunday.
590	131	First released in 1984, the song has been covered six ways from Sunday by a wide range of artists (from Jeff Buckley to Bon Jovi), and it seemed to strike a spiritual chord with Church’s fans.
591	131	The parts are cut to precision using high-pressure hydrojets or formed seven ways from Sunday using hydroforming.
592	132	She has already burned his bridges with his previous employer by publicly criticizing their marketing policy.
593	132	I would need to be humble with her. I don’t want to burn my bridges with her.
594	132	I think you just burned your bridges by insulting your team leader in front of the team.
595	132	Today, I told my boss what I think of him. I guess I burned my bridges.
596	132	Never burn bridges between yourself and your neighbors because you never know when you will need them in the future.
597	132	If you don’t get along, keep your distance but never burn bridges.
598	132	If you want to take the island, then burn your boats. – Tonny Robbins
599	132	I knew we would never get him back. He’d burned his boats.
600	132	I don’t regret burning my bridges. I regret that some people weren’t on those bridges when I burnt them. – King Hill
601	132	Burning a bridge at the right time can actually open up new opportunities for you to grow professionally.
602	133	Many feel that the disadvantages facing minorities in the country’s economic and political systems were baked into the cake from the very outset.
603	133	Unfortunately, I believe the CEO is a pathological cheater and liar. He’s been on good behavior in front of the media, sure, but stuff like that is baked into the cake.
604	133	I’m sorry, did she not realize that tantrums are just baked into the cake when you work in a preschool?
605	134	The new employee was a wolf in sheep’s clothing, stealing company secrets.
606	134	Online scams often disguise themselves as wolves in sheep’s clothing, promising rewards while stealing information.
607	134	The politician’s promises were a facade; he was a wolf in sheep’s clothing, involved in corruption.
608	134	The salesman was a wolf in sheep’s clothing, selling faulty products.
609	134	The friendly neighbor was a wolf in sheep’s clothing, spreading rumors and trouble.
610	135	Would I like a free trip to Paris? Does a bear shit in the woods? 
611	135	A: "Are you going to the party tonight?" B: "Does a bear shit in the woods? Of course I’ll be there!"
612	135	A: "Do you think Dave took the money?" B: "Are you kidding? Does a bear shit in the woods?"
613	136	It’s raining cats and dogs I am worried about how my kids will reach home.
614	136	It rains cats and dogs when the Monsoon comes in India.
615	136	How will you go to play Cricket today? It’s raining cats and dogs.
616	136	When we were returning from the picnic, it was raining cats and dogs.
617	136	I think it’s not safe to drive the car now – it’s raining cats and dogs.
618	137	Selling tourists fake artifacts is the oldest trick in the book—please don’t fall for that one.
619	137	Look, you can fix it by threading a paper clip through the hole. Oldest trick in the book!
620	138	I’m free this Saturday. Do you pick up what I’m putting down?
621	138	You don’t need to explain anymore. I pick up what you’re putting down.
622	138	I picked up what he was putting down. He alluded to "something bad that happened."
623	139	The strategies of the state government are not perfect but the people should not bite the hand that feeds them since many lucrative policies have been brought about by this government for the common people.
624	139	It is unfortunate that he has bit the hand that fed him for so long and is now oversees after taking all of their money.
625	139	To expect that a person with such integrity will not bite the hand that feeds him is laughable. Hasn’t he given you enough instances in the past about his integrity?
626	139	I would never bite the hand that feeds me, Sir. My morals are not so low.
627	139	The fact that she bit the hand that fed her doesn’t upset you even a little?
628	139	My institution decided to offer me an award, so I shouldn’t bite the hand that feeds me and criticize its policies.
629	140	Fans who have been demanding a sequel for the last decade had better put their money where their mouth is and go buy a ticket!
630	140	He promised to lower taxes if he got elected. Now let’s see if he’ll put his money where his mouth is.
631	141	We need to get our ducks in a row to ensure that there are no problems at home while we’re gone on our trip.
632	141	Make sure Finance gets their ducks in a row before the audit. 
633	141	I know I need to get my ducks in a row before I make these accusations. No one will take me seriously without concrete evidence.
634	142	The nearest hotel is about 24 kilometers away as the crow flies.
635	142	There is a beautiful hill station about 20 miles away as the crow flies, right from where we are standing now.
636	142	It’s only three miles to Square Tower as the crow flies, but it’s all of ten miles if the Glasgow Hamilton Road is closed and one has to drive round the Johnston Road.
637	142	Just go on this route as the crow flies, and you may save about 40 minutes.
638	142	I am driving for 4 hours on this trail as the crow flies and we reached nowhere yet – I think we are lost.
639	142	It was remarkable bike ride as the crow flies on Alaska-Canadian Highway.
640	143	No matter how hard I try to understand what Jim is talking about, it is apparent that his lights are on but nobody is home.
641	143	Because her lights are on but nobody is home, she has no idea what the group has decided.
642	143	The team is trying to get Mark to provide his input, but he is unable to do so because his lights are on but nobody’s home.
643	143	I tried to understand him, but the lights are on but nobody is home.
644	143	John has no idea about this, the lights are on but nobody’s home.
645	143	Lilly studied interior design, but the lights are on and nobody is home.
646	144	With the number of silly remarks he comes up with, I wonder if he’s not playing with a full deck.
647	144	He may be an influential person, but some of the things he does gives the impression that he is not playing with a full deck.
648	144	He keeps talking to himself. I think he’s not playing with a full deck.
649	144	That scientist is considered to be a genius in his field, but with some of the antics he’s up to at the university, it looks like he’s not playing with a full deck.
650	144	The new teacher doesn’t seem to know what he’s teaching. He’s not playing with a full deck.
651	144	He is a nice person, but with some of the foolish things he does, I think he’s not playing with a full deck.
652	145	The man controlled every aspect of his wife’s life until he was asked to pay the piper.
653	145	I paid the piper. The movie show that I had booked for the entire staff is now fully paid for.
654	145	The lady took my services but now refuses to pay the piper.
655	145	Nobody likes to pay the piper but you will eventually have to pay for the damage that you have caused in your juvenility.
656	145	Paying the piper is the right thing to do.
657	145	When exams are near every student should pay the piper by studying extra hours to get passed.
658	146	That guy on the corner must have a screw loose or something, because he’s been standing out there yelling obscenities at passersby all morning.
659	146	My old uncle Pete has a few screws loose, but he’s a really nice guy.
660	146	What’s the matter with you? Do you have a screw loose, or what?
661	147	I know that certain people can come across as selfish or mean-spirited, but you should try walking a mile in their shoes before you dismiss them too quickly.
662	148	At my age, I’d like to be able to say this ain’t my first rodeo, but this is my first rodeo.
663	148	This ain’t my first rodeo and I’ve been bucked off a lot.
664	149	After many quarrelling years, the two political parties finally decided to bury the hatchet.
665	149	Family members and friends are always advised to bury the hatchet when they find themselves in clashing situations.
666	149	Conflicting countries should work on the way to bury the hatchet in order to avoid going to war.
667	149	The teammates are urged to bury the hatchet for the sake of the success of the team.
668	149	The two neighboring countries India and Pakistan, have often been advised by the world bodies to bury the hatchet for their progress.
669	149	By the fear of the police, the college gang requested to bury the hatchet to the guy who was beaten severely just for not obeying them.
670	149	All right, you two. Calm down and bury the hatchet.
671	149	I wish Mr. and Mrs. Franklin would bury the hatchet. They argue all the time.
672	150	Our analysts think that the marketing campaign will reinvigorate our sales, but the proof is in the pudding, so let’s see how our figures look at the end of the year.
673	150	OK, if I did everything right, the engine should work right, but the proof will be in the pudding.
\.

COPY public.idioms_origin_test (origin_id, idiom_id, example) FROM stdin;
\.

COPY public.idioms_test (id, title, title_general, definition, contributor, timestamps) FROM stdin;
1	Not my circus, not my monkeys	Not my circus, not my monkeys	This troublesome, burdensome, or volatile situation is none of my concern, and thus I refuse to get involved in it. A loan translation of the Polish idio.	Eve	2023-07-13 00:00:01-07
2	Waiting with baited breath	Wait with bated breath	To remain in a state of eager anticipation (of or for something).	Eve	2023-07-13 00:00:02-07
3	Don’t hold your breath	Don’t hold your breath	Don’t expect something to happen. (The idea being that one couldn’t hold one’s breath long enough for the unlikely thing to happen.)	\N	2023-07-13 00:00:03-07
4	People in glass houses shouldn’t throw stones	People (who live) in glass houses shouldn’t throw stones.	People who are vulnerable to criticism should not criticize others, especially not for the faults that they themselves have (since such criticism will likely be returned).	\N	2023-07-13 00:00:04-07
5	Don’t look a gift horse in the mouth	Don’t look a gift horse in the mouth	If you receive a gift, do so graciously, without voicing criticisms. The saying is attributed to St. Jerome and refers to the practice of looking at a horse’s teeth to determine its age.	\N	2023-07-13 00:00:05-07
6	Don’t count your chickens before they hatch	Don’t count your chickens before they hatch.	Don’t make plans based on future events, outcomes, or successes that might not come to pass.	\N	2023-07-13 00:00:06-07
7	Don’t keep all your eggs in one basket	put all (one’s) eggs in one basket	To invest, devote, or commit all of one’s energy or resources into a single venture, opportunity, or goal, generally at the risk of losing everything in the event that that thing fails or does not come to fruition.	\N	2023-07-13 00:00:07-07
8	A bird in the hand is worth two in the bush	A bird in the hand is worth two in the bush	It is better to have something less valuable than to pursue something more valuable that may not be able to be obtained.	\N	2023-07-13 00:00:08-07
9	There’s more than one way to skin a cat	There’s more than one way to skin a cat	There are many methods one may employ in achieving one’s ends.	Miles	2023-07-13 00:00:09-07
10	Let the cat out of the bag	Let the cat out of the bag	To reveal a secret.	\N	2023-07-13 00:00:10-07
11	Open a can of worms	Open (up) a can of worms	To initiate, instigate, or reveal a situation that is or is likely to become very complicated or problematic or that will have a negative outcome.	\N	2023-07-13 00:00:11-07
12	Bull in a china shop	A bull in a china shop	Someone who is aggressively reckless and clumsy in a situation that requires delicacy and care.	Miles	2023-07-13 00:00:12-07
13	One trick pony	A one-trick pony	A person, group, or thing that is known for or limited to only one unique or noteworthy skill, talent, ability, quality, area of success, etc.	\N	2023-07-13 00:00:13-07
14	Don’t piss on my leg and tell me it’s raining	Piss on someone’s leg and tell them it’s raining	To tell someone an obvious lie.	Miles	2023-07-13 00:00:14-07
15	Too many chefs in the kitchen	Too many chefs in the kitchen	Too many people are trying to control, influence, or work on something, with the quality of the final product suffering as a result.	Miles	2023-07-13 00:00:15-07
16	If you can’t handle the heat get out of the kitchen	If you can’t stand the heat, get out of the kitchen	Used as a way to tell someone that they should either stop complaining about a difficult or unpleasant activity, or stop doing it	Miles	2023-07-13 00:00:16-07
17	Running on fumes	Running on fumes	Continuing to operate with no or very little enthusiasm, energy, or resources left. A reference to a car that has nearly run out of fuel.	\N	2023-07-13 00:00:17-07
18	One bad apple spoils the bunch	One bad apple spoils the (whole) bunch	It only takes one person, thing, element, etc., to ruin the entire group, situation, project, etc. Refers to the fact that a rotting apple can cause other apples in close proximity to begin to rot as well.	Eve	2023-07-13 00:00:18-07
19	The cream rises to the top	The cream (always) rises to the top	Those with the most skill, the best work ethic, or the strongest moral character will inevitably find success in life.	Miles	2023-07-13 00:00:19-07
20	Cut from same cloth	\N	Very similar in characteristics or behaviors.	\N	2023-07-13 00:00:20-07
21	Stick in the mud	Stick-in-the-mud	Someone who is considered boring, often due to unpopular or outdated beliefs.	Miles	2023-07-13 00:00:21-07
22	Don’t rain on my parade	Don’t rain on (one’s) parade	Don’t ruin one’s plans or temper one’s excitement.	Eve	2023-07-13 00:00:22-07
23	Even the darkest storm cloud has a silver lining	\N	The potential for something positive or beneficial to result from a negative situation. Often used in the phrase "every cloud has a silver lining." (A silver lining on a cloud is an indication that the sun is behind it.)	Eve	2023-07-13 00:00:23-07
24	Mess with a bull you get the horn	If you mess with the bull, you get the horns	If you anger, irritate, or provoke someone enough, you will induce some hostile retaliation or emotional reaction.	Miles	2023-07-13 00:00:24-07
25	It’s always darkest before dawn	it’s (always) darkest (just) before the dawn	The worst part of an experience, situation, period of time, etc., usually happens just before things get better.	Eve	2023-07-13 00:00:25-07
26	When it rains it pours	When it rains, it pours	When something good or bad happens, similarly good or bad things tend to follow.	\N	2023-07-13 00:00:26-07
27	Time and tide wait for no man	time and tide wait for no one	The opportunities of life will pass you by if you delay or procrastinate in taking advantage of them.	\N	2023-07-13 00:00:27-07
28	Even a broken clock is right twice a day	a broken clock is right twice a day	Even people who are usually wrong can be right sometimes, even if just by accident. From the idea that the stationary hands of a broken clock will still display the correct time at two points during the 24-hour cycle.	Miles	2023-07-13 00:00:28-07
29	For whom the bell tolls	Background	Ernest Hemingway wrot.	Miles	2023-07-13 00:00:29-07
30	Make hay while the sun is shining	Make hay while the sun is shining	To take advantage of favorable conditions; to make the most of an opportunity when it is available.	Eve	2023-07-13 00:00:30-07
31	Mellow is the man who knows what he’s missing	\N	\N	Eve	2023-07-13 00:00:31-07
32	Can’t teach an old dog new tricks	It’s hard to teach an old dog new tricks	It is exceptionally difficult to teach some new skill or behavior to someone, especially an older person, who is already firmly set in their ways.	\N	2023-07-13 00:00:32-07
33	Hindsight’s 20/20	Hindsight is (always) 20/20	It is easier to clearly reevaluate past actions or decisions than when they are being made or done; things are clearer or more obvious when they are reflected upon. A reference to the visual acuity of normal eyesight (20/20 vision).	\N	2023-07-13 00:00:33-07
34	Give a mouse a cookie and he’ll ask for a glass of milk	\N	\N	Eve	2023-07-13 00:00:34-07
35	Give an inch and they take a mile	give an inch and they’ll take a mile	Make a small concession and they’ll take advantage of you.	Miles	2023-07-13 00:00:35-07
36	The more the merrier	The more the merrier	More people will make something more enjoyable. Often used to welcome one to join a group or activity.	\N	2023-07-13 00:00:36-07
37	Measure twice cut once	Measure twice, cut once	An axiom that encourages careful first steps in order to avoid extra work later on.	Miles	2023-07-13 00:00:37-07
38	Give a man a fish, feed him for a day; teach a man to fish, feed him for a lifetime	\N	Simply giving someone a fish is not as helpful to them in the long run as teaching them how to fish.	Eve	2023-07-13 00:00:38-07
39	You can bring a horse to water but can’t make it drink	\N	You can give someone an advantage or provide them with an opportunity, but you can’t force them to do something if they don’t want to	Eve	2023-07-13 00:00:39-07
40	One man’s trash is another man’s treasure	One man’s trash is another man’s treasure	What one person may consider worthless could be highly prized or valued by someone else.	\N	2023-07-13 00:00:40-07
41	Burning the candle at both ends	Burn (one’s)/the candle at both ends	To overwork or exhaust oneself by doing too many things, especially both late at night and early in the morning.	\N	2023-07-13 00:00:41-07
42	Polishing a turd	Polish a turd	To make something unpleasant seem more appealing than it really is—which is often a futile effort. "Turd" is a slang term for a piece of feces.	Miles	2023-07-13 00:00:42-07
43	Put lipstick on a pig, its still a pig	\N	Making superficial or cosmetic changes to a product in a futile effort to disguise its fundamental failings	Eve	2023-07-13 00:00:43-07
44	One step forward two steps back	 one step forward, two steps bac.	Marked by a small amount progress that is then eradicated by a large amount of setbacks, problems, or difficulties.	\N	2023-07-13 00:00:44-07
45	It’s not over till the fat lady sings	It ain’t over till/until the fat lady sings	The final outcome cannot be assumed or determined until a given situation, event, etc., is completely finished.	\N	2023-07-13 00:00:45-07
46	Heavy is the head that wears the crown	heavy hangs the head that wears a/the crown	The person who has the most power or authority suffers the largest amount of stress, anxiety, doubt, and worry.	Eve	2023-07-13 00:00:46-07
47	Pick your poison	Pick your poison	\N	\N	2023-07-13 00:00:47-07
48	An axe to grind	An ax(e) to grind	A complaint or dispute that one feels compelled to discuss.	\N	2023-07-13 00:00:48-07
49	Big shoes to fill	Big shoes to fill	A role vacated or left behind by someone who was exceptional in their performance and set very high standards as a result.	\N	2023-07-13 00:00:49-07
50	The apple doesn’t fall far from the tree	The apple does not fall far from the tree	Said when someone is displaying traits or behaving in the same way as their relatives (especially parents).	\N	2023-07-13 00:00:50-07
51	Chip off the old block	A chip off the old block	Someone whose character or personality resembles that of their parent.	\N	2023-07-13 00:00:51-07
52	Chip on your shoulder	A chip on (one’s) shoulder	An attitude that leads one to become combative or easily angered.	\N	2023-07-13 00:00:52-07
53	Reinvent the wheel	Reinvent the wheel	To do something in a wholly and drastically new way, often unnecessarily. (Usually used in negative constructions..	\N	2023-07-13 00:00:53-07
54	Two peas in a pod	Two peas in a pod	Two people who are very similar, typically in interests, dispositions, or beliefs.	\N	2023-07-13 00:00:54-07
55	Monkey on your back	Monkey on (one’s) back	\N	\N	2023-07-13 00:00:55-07
56	Big fish in a small pond	A big fish in a small pond	A situation in which one person has more power, influence, knowledge, or experience than others within a small group. It often implies that the person may not have as much clout i."a bigger pond," i.e., a larger group or arena of some kind.	\N	2023-07-13 00:00:56-07
57	When pigs fly	When pigs fly	At a point in time that will never come to pass. (Used to show skepticism or cynicism over some hypothetical situation or outcome..	\N	2023-07-13 00:00:57-07
58	When hell freezes over	When hell freezes over	Never; at no time.	\N	2023-07-13 00:00:58-07
59	Out of the frying pan and into the fire	\N	\N	Eve	2023-07-13 00:00:59-07
60	The pot calling the kettle black	The pot calling the kettle black	A situation in which a person accuses someone of or criticizes someone for something that they themselves are guilty of.	Eve	2023-07-13 00:01:00-07
61	Frog in boiling water	\N	\N	\N	2023-07-13 00:01:01-07
62	You gotta kiss a lot of frogs to find a prince	\N	\N	\N	2023-07-13 00:01:02-07
63	Bat out of hell	\N	\N	\N	2023-07-13 00:01:03-07
64	Going to hell in a hand basket	Go to hell in a handbasket	To be in an extremely and increasingly bad or ruinous condition; to be on the inevitable path to utter failure or ruin.	\N	2023-07-13 00:01:04-07
65	Bite off more then you can chew	\N	\N	\N	2023-07-13 00:01:05-07
66	The bigger they are the harder they fall	The bigger they are, the harder they fall	Those who are exceptionally large, powerful, or influential will have more to lose when they fail, and their failure will be all the more dramatic or spectacular because of it.	\N	2023-07-13 00:01:06-07
67	The hair of the dog that bit you	The hair of the dog (that bit you)	An alcoholic drink consumed to remedy a hangover. The phrase comes from the notion that literally rubbing the hair of the dog that bit you on the wound would help it to heal.	Eve	2023-07-13 00:01:07-07
68	Wish in one hand and shit in the other	\N	\N	Miles	2023-07-13 00:01:08-07
69	All who wander are not lost	\N	\N	\N	2023-07-13 00:01:09-07
70	All that glitters is not gold	All that glitters is not gold	Things that have an outward appeal are often not as beautiful or valuable as they seem.	\N	2023-07-13 00:01:10-07
71	Diamond in the rough	Diamond in the rough	A person or thing with exceptional qualities or characteristics that cannot be seen from the surface.	\N	2023-07-13 00:01:11-07
72	Leave no stone unturned	Leave no stone unturned	To look for something in every possible place.	\N	2023-07-13 00:01:12-07
73	No holds barred	No-holds-barred	free of restrictions or hampering conventions	\N	2023-07-13 00:01:13-07
74	Throw the baby out with the bath water	Throw the baby out with the bath	To discard something valuable or important while disposing of something considered worthless, especially an outdated idea or form of behavior. The phrase is often used in the negative as a warning against such thoughtless behavior.	Eve	2023-07-13 00:01:14-07
75	Everything but the kitchen sink	Everything but the kitchen sink	Nearly everything one can reasonably imagine; many different things, often to the point of excess or redundancy.	\N	2023-07-13 00:01:15-07
76	Slow and steady wins the race	Slow and steady wins the race	Persistent, consistent, and diligent progress, even if it is somewhat slow, will produce better results than rushing to get somewhere or achieve something, as the latter can result in mistakes or may prove unsustainable or unreliable.	\N	2023-07-13 00:01:16-07
77	Two sides to to the same coin	\N	\N	\N	2023-07-13 00:01:17-07
78	Play the hand you’re dealt	Play the hand (one) is dealt	To accept, deal with, and make the most of one’s current situation or circumstances; to make use of that which one is afforded or has available.	\N	2023-07-13 00:01:18-07
79	When life gives you lemons make lemonade	When life gives you lemons, make lemonade	Focus on the good in a bad situation and take action accordingly.	\N	2023-07-13 00:01:19-07
80	Put a pin in it	Put a pin in it	To take a break from discussing some topic, with plans to resume the discussion later.	\N	2023-07-13 00:01:20-07
81	The cherry on top	Cherry on top	The flourish that caps something off (much like a cherry tops off an ice cream sundae). Sometimes used in the phrase "pretty please with a cherry on top.".	\N	2023-07-13 00:01:21-07
82	Icing on the cake	The icing on the cake	An additional benefit or positive aspect to something that is already considered positive or beneficial.	\N	2023-07-13 00:01:22-07
83	The squeaky wheel gets the grease	The squeaky wheel gets the grease	The person complaining or protesting the loudest or most frequently is the one who will receive the most attention from others.	\N	2023-07-13 00:01:23-07
84	Raised nails get pounded	\N	\N	\N	2023-07-13 00:01:24-07
85	Softer than a baby’s bottom	\N	\N	\N	2023-07-13 00:01:25-07
86	Hell or high water	By hell or high water	By any means necessary; regardless of any difficulty, problem, or obstacle.	\N	2023-07-13 00:01:26-07
87	Stuck between a rock and a hard place	\N	\N	\N	2023-07-13 00:01:27-07
88	Airing out your dirty laundry.	\N	\N	\N	2023-07-13 00:01:28-07
89	Skeletons in your closet	Skeleton in the/(one’s) closet	An embarrassing or shameful secret. Primarily heard in US.	\N	2023-07-13 00:01:29-07
90	Skating on thin ice	Skating on thin ice	Engaged in some activity or behavior that is very risky, dangerous, or likely to cause a lot of trouble.	\N	2023-07-13 00:01:30-07
91	Flying too close to the sun	Fly too close to the sun	To do something especially ambitious and daring that can or ultimately does lead to one’s own undoing or downfall. An allusion to the mythical figure Icarus, whose wings made of feathers and wax melted when he flew too close to the sun.	Eve	2023-07-13 00:01:31-07
92	Toot your own horn	Toot (one’s) own horn	To boast or brag about one’s own abilities, skills, success, achievements, etc.	\N	2023-07-13 00:01:32-07
93	Pat yourself on the back	\N	\N	\N	2023-07-13 00:01:33-07
94	Catch more flies with honey than vinegar	You (can) catch more flies with honey than (with) vinegar	You are more likely to get the results you want from other people if you treat them with kindness or flattery, rather than being aggressive, demanding, or caustic.	Eve	2023-07-13 00:01:34-07
95	Kill them with kindness	Kill (one) with kindness	To harm, inconvenience, or bother one by treating them with excessive favor or kindness.	Eve	2023-07-13 00:01:35-07
96	Eye for an eye makes the whole world blind	An eye for an eye makes the whole world blind	No good will result from avenging injuries in a manner equal to the original offense.	Eve	2023-07-13 00:01:36-07
97	In the land of the blind the one eyed man is king	In the land of the blind, the one-eyed man is king	Someone with few skills or abilities can impress and wield power over those who have even less to offer.	Eve	2023-07-13 00:01:37-07
98	That ship has sailed	That ship has sailed	Some possibility or option is no longer available or likely.	Eve	2023-07-13 00:01:38-07
99	Two ships passing the night	\N	\N	\N	2023-07-13 00:01:39-07
100	The pen is mightier than the sword	The pen is mightier than the sword	Strong, eloquent, or well-crafted speech or writing is more influential on a greater number of people than force or violence.	\N	2023-07-13 00:01:40-07
101	Double edged sword	Double-edged sword	Something that can be both beneficial and problematic.	Miles	2023-07-13 00:01:41-07
102	I don’t have a dog in that fight	\N	\N	\N	2023-07-13 00:01:42-07
103	Spare the rod, spoil the child	\N	\N	Eve	2023-07-13 00:01:43-07
104	Like water off a ducks back	\N	\N	Eve	2023-07-13 00:01:44-07
105	The juice isn’t worth the squeeze	\N	\N	Miles	2023-07-13 00:01:45-07
106	Can’t get blood from a stone	You can’t get blood from a stone	It is impossible to obtain something from someone if they are too parsimonious, uncharitable, or resolved against it.	Miles	2023-07-13 00:01:46-07
107	Don’t judge a book by its cover	Don’t judge a book by its cover	Don’t base your opinion of something (or someone) on the way it (or one) looks.	\N	2023-07-13 00:01:47-07
108	You can’t step into the same river twice	\N	\N	Eve	2023-07-13 00:01:48-07
109	Don’t whistle up the wind	\N	\N	\N	2023-07-13 00:01:49-07
110	Stick a fork in me	Stick a fork in (me/it/something)	A phrase used to indicate that one or something is finished, complete, or no longer able to continue. Alludes to the practice of testing how thoroughly a piece of meat is cooked by piercing it with a fork.	\N	2023-07-13 00:01:50-07
111	This goose is cooked	(one’s) goose is cooked	One is thoroughly defeated, ruined, or finished.	Eve	2023-07-13 00:01:51-07
112	You shake it more than twice you’re playing with it	\N	\N	Miles	2023-07-13 00:01:52-07
113	Why buy the cow when the milk is free	Why buy a/the cow when you can get (the) milk for free?	If someone is already able to obtain some commodity or benefit freely or easily, then they won’t be inclined to pay for the source of it.	\N	2023-07-13 00:01:53-07
114	Don’t rock the boat	Don’t rock the boat	Don’t say or do something that could upset a stable situation.	\N	2023-07-13 00:01:54-07
115	If the shoe fits, wear it	If the shoe fits(, wear it)	If something (typically negative) applies to one, one should acknowledge it or accept responsibility or blame for it.	\N	2023-07-13 00:01:55-07
116	If it walks like a duck, talks like duck, it’s probably a duck	if it looks like a duck and walks like a duck, it is a duck	If something has all the characteristics of a thing, it is probably that thing, regardless of what it is called or presented as. There are many variations of the expression, and it is often shortened to the first part of the phrase.	\N	2023-07-13 00:01:56-07
117	Waiting for the other shoe to drop	Waiting for the other shoe to drop	To wait for the next, seemingly unavoidable (and typically negative) thing to happen.	Eve	2023-07-13 00:01:57-07
118	The grass is always greener on the other side of the fence	The grass is always greener (on the other side)	Other people’s circumstances or belongings always seem more desirable than one’s own.	\N	2023-07-13 00:01:58-07
119	Birds of a feather flock together	Birds of a feather flock together	People who have similar interests, ideas, or characteristics tend to seek out or associate with one another.	\N	2023-07-13 00:01:59-07
120	What’s good for the goose is good for the gander	what’s good for the goose is good for the gander	Used to say that one person or situation should be treated the same way that another person or situation is treated	Eve	2023-07-13 00:02:00-07
121	Early bird gets the worm	The early bird catches the worm	Someone who seizes some opportunity at the earliest point in time will have the best chance of reaping its benefits.	\N	2023-07-13 00:02:01-07
122	Let sleeping dogs lie	Let sleeping dogs lie	To leave a situation alone so as to avoid worsening it.	Eve	2023-07-13 00:02:02-07
123	A stitch in time saves nine	A stitch in time (saves nine)	A prompt, decisive action taken now will prevent problems later.	Eve	2023-07-13 00:02:03-07
124	Every dog has his day	Every dog has his/her/their day	Even the least fortunate person will have success at some point.	Eve	2023-07-13 00:02:04-07
125	Reap what you sow	Reap what (one) sows	To suffer the negative consequences of one’s actions.	\N	2023-07-13 00:02:05-07
126	Till the cows come home	Until the cows come home	For a very long, indefinite amount of time; forever.	Eve	2023-07-13 00:02:06-07
127	Chickens come home to roost	(one’s) chickens come home to roost	For a very long, indefinite amount of time; forever.	Eve	2023-07-13 00:02:07-07
128	Missed the forest for the trees	can’t see the forest for the trees	Cannot see, understand, or focus on a situation in its entirety due to being preoccupied with minor details.	Eve	2023-07-14 00:00:01-07
129	When in Rome, do as the Romans do	When in rome (do as the romans do)	One should do what is customary or typical in a particular place or setting, especially when one is a tourist.	Miles	2023-07-14 00:00:02-07
130	6 in one hand half dozen in the other	six in one, (and) half a dozen in the other	The difference between these two options is negligible, irrelevant, or unimportant; either option is fine or will work as well as the other.	Eve	2023-07-14 00:00:03-07
131	6 ways to Sunday	6 wasy to Sunday	Thoroughly or completely; in every possible way; from every conceivable angle.	Eve	2023-07-14 00:00:04-07
132	Burning bridges	Burn (one’s) bridges	\N	Miles	2023-07-14 00:00:05-07
133	Baked in the cake	Baked in the cake	\N	Miles	2023-07-14 00:00:06-07
134	A wolf in sheep’s clothing	A wolf in sheep’s clothing	A person or thing that appears harmless but is actually dangerous or bad.	Miles	2023-07-14 00:00:07-07
135	Does a bear shit in the woods	\N	A rhetorical question meaning the answer to the previous question is emphatically and obviously "yes.".	Miles	2023-07-14 00:00:08-07
136	Raining cats and dogs	It’s raining cats and dogs	It is raining extremely heavily.	Eve	2023-07-14 00:00:09-07
137	Oldest trick in the book	The oldest trick in the book	A method of deception, or of addressing some issue, that is well known or has been used for a long time.	Miles	2023-07-14 00:00:10-07
138	I’m picking up what you’re putting down	\N	\N	Miles	2023-07-14 00:00:11-07
139	Biting the hand that feeds you	Bite the hand that feeds (you)	To scorn or poorly treat those on whom you depend or derive benefit.	Miles	2023-07-14 00:00:12-07
140	Put you’re money where your mouth is?	\N	\N	Miles	2023-07-14 00:00:13-07
141	Get your ducks in a row	Get (one’s) ducks in a row	To take action to become well-organized, prepared, or up-to-date.	Miles	2023-07-14 00:00:14-07
142	As the crow flies	As the crow flies	The measurement of distance in a straight line. (From the notion that crows always fly in a straight line..	Miles	2023-07-14 00:00:15-07
143	The lights are on by nobody is home	\N	\N	Miles	2023-07-14 00:00:16-07
144	Not playing with a full deck	Not playing with a full deck	Not mentally sound; crazy or mentally deranged.	Miles	2023-07-14 00:00:17-07
145	Pay the pied piper	\N	\N	Miles	2023-07-14 00:00:18-07
146	Got a screw loose	\N	\N	Miles	2023-07-14 00:00:19-07
147	Walk a mile in someone’s shoes	Walk a mile in (someone’s) shoes	To spend time trying to consider or understand another person’s perspectives, experiences, or motivations before making a judgment about them.	Miles	2023-07-14 00:00:20-07
148	This isn’t my first rodeo	Not (one’s) first rodeo	One is experienced with a certain situation, especially in relation to potential pitfalls or deceitful practices by others.	Miles	2023-07-14 00:00:21-07
149	Bury the hatchet	Bury the hatchet	To make peace with someone.	Miles	2023-07-14 00:22:00-07
150	Proof is in the pudding	The proof is in the pudding	The final results of something are the only way to judge its quality or veracity.	Eve	2023-07-14 00:23:00-07
\.

SELECT pg_catalog.setval('public.idioms_examples_test_example_id_seq', 674, true);

SELECT pg_catalog.setval('public.idioms_origin_test_origin_id_seq', 1, false);

SELECT pg_catalog.setval('public.idioms_test_id_seq', 151, true);

ALTER TABLE ONLY public.idioms_examples_test
    ADD CONSTRAINT idioms_examples_test_pkey PRIMARY KEY (example_id);

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_idiom_id_key UNIQUE (idiom_id);

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_pkey PRIMARY KEY (origin_id);

ALTER TABLE ONLY public.idioms_test
    ADD CONSTRAINT idioms_test_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.idioms_examples_test
    ADD CONSTRAINT idioms_examples_test_idiom_id_fkey
    FOREIGN KEY (idiom_id)
    REFERENCES public.idioms_test(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms_test(id);