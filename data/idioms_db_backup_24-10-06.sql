--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.3

-- Started on 2024-10-06 19:50:54 PDT

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

--
-- TOC entry 212 (class 1259 OID 147505)
-- Name: idioms_examples_test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.idioms_examples_test (
    example_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);


ALTER TABLE public.idioms_examples_test OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 147504)
-- Name: idioms_examples_test_example_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.idioms_examples_test_example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.idioms_examples_test_example_id_seq OWNER TO postgres;

--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 211
-- Name: idioms_examples_test_example_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.idioms_examples_test_example_id_seq OWNED BY public.idioms_examples_test.example_id;


--
-- TOC entry 214 (class 1259 OID 147521)
-- Name: idioms_origin_test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.idioms_origin_test (
    origin_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);


ALTER TABLE public.idioms_origin_test OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 147520)
-- Name: idioms_origin_test_origin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.idioms_origin_test_origin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.idioms_origin_test_origin_id_seq OWNER TO postgres;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 213
-- Name: idioms_origin_test_origin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.idioms_origin_test_origin_id_seq OWNED BY public.idioms_origin_test.origin_id;


--
-- TOC entry 209 (class 1259 OID 147475)
-- Name: idioms_test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.idioms_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.idioms_test_id_seq OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 147476)
-- Name: idioms_test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.idioms_test (
    id integer DEFAULT nextval('public.idioms_test_id_seq'::regclass) NOT NULL,
    title character varying(255),
    title_general character varying(255),
    definition text,
    contributor character varying(50),
    timestamps timestamp with time zone
);


ALTER TABLE public.idioms_test OWNER TO postgres;

--
-- TOC entry 3442 (class 2604 OID 147508)
-- Name: idioms_examples_test example_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_examples_test ALTER COLUMN example_id SET DEFAULT nextval('public.idioms_examples_test_example_id_seq'::regclass);


--
-- TOC entry 3443 (class 2604 OID 147524)
-- Name: idioms_origin_test origin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_origin_test ALTER COLUMN origin_id SET DEFAULT nextval('public.idioms_origin_test_origin_id_seq'::regclass);


--
-- TOC entry 3596 (class 0 OID 147505)
-- Dependencies: 212
-- Data for Name: idioms_examples_test; Type: TABLE DATA; Schema: public; Owner: postgres
--

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
1043	231	These songs are just the tip of the creative iceberg.
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
674	151	When Jennifer came in soaking wet from the rain, Candice laughed and said, "Look what the cat dragged in!"
675	151	Hey, everybody, look what the cat’s dragged in. How’s retirement treating you, Joe?
676	152	Lauren finally spilled the beans. She has been promoted to manager, and it’s going to upset some people in the office.
677	152	Have you heard that Mike is having an affair with his secretary? His colleague just spilled the beans.
678	152	If you see Patsy at the weekend, get her to spill the beans on her date with Carl.
679	152	We had managed to keep the party a secret from Bill until Katy spilled the beans yesterday.
680	152	We didn’t want to reveal the gender of the baby, but I spilled the beans to my mother that we were painting the baby’s room blue.
681	152	Olivia spills the beans on her brother’s love story in front of everyone in the classroom.
682	152	The Scotland Yard Police have been trying to get him to spill the beans about the anomalies in the department, but he won’t tell them a thing.
683	153	I’ve been at loose ends since that fight with my mother.
684	153	I hope he finds a job soon—he’s been at loose ends ever since getting laid off.
685	153	A: "Why are you at loose ends?" B: "Because Taylor and I still can’t agree on how to lead the committee."
686	154	Wildlife in disaster movies assumes the role of the canary in the coal mine, fleeing the scene when catastrophe is imminent.
687	154	Unaware that he had been given the test drug, John was used as a canary in the coal mine to see its effects on the human mind.
688	154	This guy’s usually my canary in a coal mine. If he’s reporting an issue with the system, it’s worth looking into.
689	155	I’m sorry, boss, I really screwed the pooch this time. Do you think we can get the clients back if I explain that it was all a misunderstanding because of me?
690	155	This operation depends on you, so don’t screw the pooch!
691	156	Your grandmother arrives tomorrow and the house is still a mess—I need all hands on deck to help me clean!
692	156	All hands on deck! We’ve got to roll out this tarp before the rain starts. Now let’s go!
693	156	Mom says she needs all hands on deck for the garage sale on Saturday, so my brothers and I are going home to help her.
694	157	The little boy had cried wolf so many times that when he was really sick no one believed him.
695	157	The woman cried wolf so often that when she really needed help the security company took their time to get to her.
696	157	These doomsday cults have cried wolf so many times that no one even listens to them anymore.
697	157	As the children has cried wolf too often, the parents has stopped taking its notice.
698	158	I had dotted all the i’s and crossed the t’s, so I wondered why my application was rejected.
699	158	Before taking the project to the CEO, let’s make sure we dot the i’s and cross the t’s.
700	158	She writes highly accurate reports – she always dots her i’s and crosses her t’s.
701	158	The negotiations are nearly finished, but we still have to dot the i’s and cross the t’s.
702	158	Why can’t Jerry dot the i’s and cross the t’s? I always find mistakes in his work.
703	158	Your instructor is a tough grader, be sure to dot your i’s and cross your t’s on your research.
704	159	Judy was over the moon when Tim proposed to her.
705	159	He was over the moon when he got a job with his dream company.
706	159	My daughter was over the moon when she got her new bicycle.
707	159	The players were over the moon after overcoming a tough opponent to win the championship.
708	159	We were over the moon when we finally moved into our new house.
709	159	She was over the moon when she was declared the winner of the singing competition.
710	159	They were over the moon when their start-up bagged a major deal from a reputed client.
711	159	I was over the moon when he broke the news to me.
712	160	My parents always taught me to shoot for the stars when I was growing up—that I could be anything I set my mind to!
713	160	With all that money, you could do whatever you want. Shoot for the stars, kiddo!
714	161	He gave a very diplomatic explanation, but if you read between the lines, it seems like he was fired for political reasons.
715	161	Reading between the lines, it looks the like the company is bracing for a hostile takeover.
716	162	I pay your wages, and I’ll say whether you can go on your break or not, so put that in your pipe and smoke it.
717	162	Ha! I told you my team would win. Put that in your pipe and smoke it!
718	163	You OK, Tom? You’re looking rode hard and put away wet.
719	163	That old-timer must have had a long, tough life, because he looks rode hard and put away wet.
720	163	Proper maintenance of your motorcycle is crucial. If you ride it hard and put it away wet, you’re going to be paying out the ear for repairs down the line.
721	163	The new motor on their latest bike is designed to deal with ongoing stress, so even if you are the type of person to ride hard and put it away wet, you should still be able to put in a lot of miles without an issue.
722	164	I’m so impressed by your grades, honey—you really put your nose to the grindstone this year, and it paid off!
723	164	I’ve got to put my nose to the grindstone if I’m going to get this promotion.
724	165	She cut back on her daily coffee purchases, adhering to the principle that a penny saved is a penny earned.
725	165	By using coupons and looking for sales, they follow the adage that a penny saved is a penny earned.
726	165	He reminds his children that a penny saved is a penny earned, teaching them to appreciate the importance of saving money.
727	165	He tries to do all the work himself and always says that a penny saved is a penny earned.
728	165	Because she is a financial consultant, she always advises people to save money. She frequently tells her clients that a penny saved is a penny earned.
729	166	A delicious meal has always been the key to my wife’s heart if she’s annoyed with me or feeling down in the dumps.
730	166	Oh wow, a new set of art supplies! Thank you, John, you really know the key to my heart.
731	167	Look, you’ve been doing excellent work lately, but a promotion just isn’t in the cards right now—our budget is stretched way too thin as it is.
732	167	They’ve played very well in today’s championship game, but if they can’t overcome this deficit, a title won’t be in the cards for them.
733	167	You were in that big meeting—please tell me layoffs aren’t in the cards.
734	168	You’re never going to save enough money to buy a house if you keep buying expensive appliances and cars. You can’t eat your cake and have it, too. 
735	168	You can’t eat your cake and have it. If you demand all sorts of social benefits from the government, you need to be willing to pay the taxes to fund them.
736	169	I have to go to the bank, and on the way back, I’ll pick up the groceries as well, killing two birds with one stone.
737	169	He had gone to London on a business trip, while there, he killed two birds with one stone and visited his relatives as well.
738	169	Cycling to work kills two birds with one stone. It saves money and gives you some exercise.
739	169	I read the newspaper while sipping my morning cup of tea, killing two birds with one stone.
740	169	When I went for the interview, I caught up with a few old colleagues who now work there, killing two birds with one stone.
741	169	He dropped his kids to school while going to work, killing two birds with one stone.
742	170	I’m not upset that vacation time might be reduced because I have no horse in this race. I’m just a part-time employee, so I don’t get paid vacation days as it is. 
743	170	Now that I’ve stopped practicing medicine, new regulations don’t bother me in the slightest—I have no horse in this race anymore.
744	171	The manager was fired from his job after making such a huge mistake, but that’s the way the cookie crumbles.
745	171	I have not looked back on the past since I moved out of my parents’ house because that’s the way the cookie crumbles.
746	171	The man knows that that’s the way the cookie crumbles and he will be fine.
747	171	I learnt that that’s the way the cookie crumbles when I was in school and have been able to take care of myself.
748	171	I know it is unfair but that’s the way the cookie crumbles.
749	172	Kate would never cheat on an exam—she’s as straight as an arrow.
750	172	I know Bob’s story sounds ridiculous, but I believe him because he’s straight as an arrow.
751	172	I’ve always known Amanda to be straight as an arrow, so I can’t believe she got caught shoplifting.
814	185	With no experience in cooking, my husband was a babe in the woods in the kitchen.
752	173	Despite the temptations and distractions around him, John managed to stay on the straight and narrow, always making the right choices.
753	173	Growing up in a tough neighborhood, Maria had to navigate through many challenges to stay on the straight and narrow path.
754	173	After his troubled past, Mark turned his life around and committed himself to walking the straight and narrow, determined to leave his mistakes behind.
755	173	Living a life on the straight and narrow may be challenging, but it leads to a sense of fulfillment and peace.
756	173	Sarah’s parents encouraged her to stay on the straight and narrow by focusing on her education and avoiding distractions.
757	173	Emily’s determination to stay on the straight and narrow guided her through difficult times, ensuring she made responsible choices.
758	174	I gave up smoking for nearly a year, but I fell off the wagon at Jeff’s bachelor party.
759	174	He gave up video games while he was studying for his final exams, but now that it’s summer break he’s fallen off the wagon again.
760	174	I was really good about my diet, but I fell off the wagon and went for some fast food last night.
761	175	Most of the survivors of the airplane crash are still at death’s door.
762	175	Don’t overstate, it was only flu, you were barely at death’s door.
763	175	Jane was so ill that she was at death1’s door for three days.
764	175	Whenever she had a bad cold she acted as though she were at death’s door.
765	175	Owing to coming up of malls and super market every other day in the town the old neighborhood store is at death’s door.
766	175	The family cat was at death’s door for three days, and then it finally died.
767	175	She literally was at death’s door when a kidney became available for transplant.
768	175	Jack lay at death’s door for over a month.
769	175	I do not want to lie at death’s door suffering. I hope to pass on quickly.
770	175	Poor Jon! He has blood cancer and I fear he’s at death’s door.
771	175	The young man was at death’s door after that catastrophic accident.
772	176	I’ll be pushing up daisies by the time she replies to my proposal.
773	176	Henry’s grandpa was pushing up daisies before he returned from Australia.
774	177	A: "I can’t believe the amount of taxes I have to pay on my lottery winnings!" B: "Every rose has its thorn, eh?"
775	177	That’s just how life is, honey—every rose has its thorn. You have to take the good with the bad.
776	177	I was so excited to buy this house, until I realized how much work I’d have to put into it. Ugh, every rose has its thorn.
777	178	I know you’re scared to go back on a plane after that crash, but lightning never strikes twice.
778	178	There’s no way we could get hit by such a devastating storm like that again—lightning never strikes the same place twice
779	179	The only rule of the marketplace was dog-eat-dog.
780	179	It’s a dog-eat-dog
781	179	You have to look out for your own interests; it’s a dog-eat-dog
782	179	Your company fired you two days after you had a heart attack? Well, it’s undoubtedly a dog-eat-dog
783	179	It’s a dog eat dog world out there. You have to do whatever you can to survive.
784	179	Many colleges are like dog-eat-dog. People will compete at any cost for higher grades and not care if others get hurt in the process.
785	179	That school dog-eat-dog. The students cheat and even destroy each other’s work to get better grades."
786	179	In the film, business dog eat dog, you’re a star one day, the next day you’ve been replaced by younger talent.
787	179	There is intense competition and rivalry in a dog-eat-dog world, where everybody thinks only of himself or herself.
788	179	In the dog eat dog world out there, it pays to know who one’s real friends are.
789	180	I had no contact with him since school, and I bumped into him at a friend’s party! It’s a small world.
790	180	My old English teacher is your aunt? Well, it’s a small world indeed!
791	180	Fancy running into you here. I thought I would never see you again! It’s a small world.
792	180	Do you know my friend from school? Wow, it’s a small world, isn’t it?
793	180	Imagine meeting her at the theater last night. It’s a small world.
794	180	I never thought I’d run into her at a sports ground – it’s a small world.
795	180	It was great catching up with you after all this time. I never imagined you would be here – it’s a small world.
796	180	It’s a small world, it was good to see her in Australia.
797	182	It won’t take me much time to remember, her name is on the tip of my tongue.
798	182	Just give me a minute – his birth date is on the tip of my tongue.
799	182	I can’t exactly remember the title of the book, but it is on the tip of my tongue.
800	182	Sara looked up at me with questions on the tip of her tongue.
801	182	There was a question on the tip of his tongue, but he was unable to ask it.
802	182	Marry was badly annoyed by the behavior of the staff, terrible comments were on the tip of her tongue.
803	183	I drew the short straw when it came to cleaning up after our shift last night.
804	183	Our team drew the short straw and had to come in over the weekend to work on the revised proposal.
805	183	Brandon drew the short straw and had to tell Mrs. Maddox we broke her window.
806	184	When she asked me to marry her, I could only stand there like a deer in headlights.
807	184	He froze like a deer in the headlights when I caught him taking money out of the register.
808	185	As a first-year student in college, I felt like a total babe in the woods.
809	185	In the cutthroat world of corporate politics, my little brother was just a babe in the woods.
810	185	My poor mother was a babe in the woods when it came to navigating the city’s public transportation after living in a small town her whole life.
811	185	Starting a new job can make anyone feel like a babe in the woods.
812	185	Compared to the seasoned athletes on the team, the new member was a babe in the woods.
813	185	I was a babe in the woods when I first started investing in the stock market.
815	186	He got cold feet when heard the news of his transfer to remote area of the country which is hundreds of miles from his home town.
816	186	The burglar has got cold feet, when the dog started barking.
817	186	Veronica gets cold feet once again about going on a trip to Europe.
818	186	Peter is getting cold feet about helping investigation agencies – it smells something fishy.
819	186	Steve is the only member in our family who appears to be getting cold feet about moving to the new house.
820	187	They caught him red-handed with his fingerprints all over the murder weapon.
821	187	She was caught red-handed by a security guard putting items in her pockets.
822	187	My boyfriend caught me red-handed eating biscuits when I was on a diet.
823	187	Jack was caught red-handed driving under the influence of drugs.
824	187	Man caught red-handed peeping into women’s locker room of a gym.
825	187	He wants to catch his friend red-handed while cheating on him.
826	187	Thief caught red-handed carrying a jewellery box stolen from the victim’s house.
827	189	Has he decided which offer he is going to accept or is he still sitting on the fence?
828	189	You can’t sit on the fence any longer, you need to make up your mind.
829	189	Instead of sitting on the fence, why don’t you list out the pros and cons so that you can reach a decision.
830	189	It would be good if you stop sitting on the fence and choose whose side you are on.
831	189	He did not want to say no to either of them, so he was just sitting on the fence.
832	189	She did not know whether to say yes or no to the proposal, she was sitting on the fence.
833	189	When two heavyweights have an argument, its best to sit on the fence and not make either of the turn against you.
834	189	I was surprised when he came up with a decision, he usually just sits on the fence.
835	190	You can get lost in the weeds right after a big album, a big major release, in a singing competition,” said Hicks, 43.
836	190	It might seem academic to political scientists who can get lost in the weeds of the swampy morass of state governance, but it is a crucial consideration that weighs on the minds of everyone who thinks going to the polls will bring about results.
837	191	Aren’t you putting the cart before the horse in decorating your new office? You haven’t even been awarded the job yet.
838	191	Don’t put the cart before the horse by investing in a new shop before selling that old one situated in west of the city.
839	191	By waking up late at night and sleeping all day long. Why are you putting the cart before the horse?
840	191	I think you are putting the cart before the horse by leaving your permanent job before getting new one.
841	192	I can’t wait to go out with my best friend and paint the town red!
842	192	Let’s go and paint the town red, Sarah.
843	192	We are getting all dressed up next week and we are going to paint the town red.
844	193	His plans of becoming an astronaut are a pipe dream, he should be more realistic.
845	193	She had wanted to be a ballet dancer when she grew up, but as she got older, she realised it was nothing but a pipe dream.
846	193	They had wanted to grow the business until it was large enough to employ 100 staff but that was turning into a pipe dream with the economy how it is.
847	193	As she bent her head to receive the gold medal, she realised competing for her country in the Olympics was no longer a pipe dream.
848	194	I urged him not to chase the dragon; it’s a perilous path with no return.
849	194	She was out and about trying to help those who were trapped in the endless loop of chasing the dragon.
850	194	He has been chasing the dragon for years, and his health has deteriorated severely.
851	194	Despite being warned multiple times, she couldn’t resist the urge to chase the dragon anytime soon.
852	194	The documentary About Last Night showcased individuals who had fallen prey to the urge to chase the dragon.
853	194	Many people logged in to the support group sessions to share their experiences with chasing the dragon.
854	194	Her life took a tragic turn the next time around. She decided to chase the dragon.
855	194	Authorities are doing their best to curb the number of individuals chasing the dragon.
856	194	He had never batted an eye when it came to his tendency to chase the dragon.
857	194	They were trying to feed into the community’s strength to stop the youngsters from chasing the dragon.
858	195	Don’t listen to the salesmen around here. They’ll blow smoke up your ass for an hour to try to get you to buy a car.
859	195	Don’t blow smoke up my ass,” said Vance. “I know you just want me to let you borrow my car.
860	195	My editor told me I deserve a Pulitzer for my latest article. I hope he wasn’t just blowing smoke up my ass.
861	196	The kids copied the teacher’s moves, like "monkey see, monkey do," during the dance.
862	196	Some followers mimic their leaders’ actions without thinking, a classic "monkey see, monkey do" scenario in politics.
863	196	The intern replicated procedures without understanding them, displaying a "monkey see, monkey do" mentality.
864	196	Teenagers often succumb to peer pressure, engaging in "monkey see, monkey do" behavior.
865	196	Instead of innovating, some businesses blindly imitate competitors, trapped in a "monkey see, monkey do" cycle.
866	197	After I declared bankruptcy, I had to pull myself up by my bootstraps and rebuild my financial standing. 
867	197	Whenever I hear someone say that poor people just need to pull themselves up by their own bootstraps, I remind them that a lot of people don’t have boots.
868	198	The man has been in a rat race all his life. No wonder he is enjoying his retired life to the fullest.
869	198	I am not going to enter this rat race. I may as well do something else.
870	198	It is a rat race at my work place. Every person there is looking either for a promotion or to change their job.
871	198	This school prepares its students for the rat race from the very beginning.
872	198	She is still so young, it is sad to see her being so caught in the rat race.
873	198	Marie has struggled for a long time to come out of the rat race for a very long time.
874	198	Her education qualification and street smart attitude never let her get caught in the rat race.
875	199	The deal isn’t yet written in stone, but we’re confident it will go ahead as hoped. 
876	200	If we can just get the application approved, then we should have smooth sailing from there. 
877	200	Organizing the event was really stressful, but it actually turned out to be pretty smooth sailing on the day.]
878	201	I’m sure I can finish the rest of the experiment on my own—it’s all downhill from here. 
879	201	The hardest part of the process was getting the application approved. Now that we have everything in place, it’s all downhill from here! 
880	201	Thank you for organizing all the files we need for the report. Now we just have to put the information into the system—basically, it’s all downhill from here.
881	202	We already know that Emma is healthy, so if she can’t get pregnant, then I must be shooting blanks.
882	203	I was so drunk I was pushing rope the entire time. She wasn’t pleased.
883	205	Over my dead body will you drive home after you’ve been drinking!
884	205	A: "I heard Sarah wants to drop out of school to be a painter." B: "Yeah, over my dead body!"
885	205	Sally: Alice says she’ll join the circus no matter what anybody says. Father: over my dead body! Sally: Now, now. You know how she is. Bill: I think I’ll rent out our spare bedroom. Sue: over my dead body! Bill (smiling): That can be arranged.
886	205	They will destroy Penbrook Farm only over my dead body.
887	205	Arnold Schwarzenegger’s wife told him he would go into politics "over her dead body".
888	205	A: "Mum, can I get a tattoo?" B: "Over my dead body!"
889	206	Nearly half the town showed up to the party, and we all raised the roof for the entire night.
890	206	Fans raised the roof when their team won the championship for the first time in over 60 years.
891	206	Best audience I’ve ever had in my life—they practically raised the roof.
892	206	The fans lifted the roof when Mulligan scored.
893	206	The fans were patient and understanding and when I finally scored against Swansea they raised the roof.
894	206	The audience raised the roof when the band played their favorite song.
895	206	The crowd brought the roof down when the home team scored. I had never ever heard such cheering.
896	206	They raised the roof at the party.
897	206	Angry tenants finally raised the roof about their noisy neighbors.
898	207	The way everyone pitched in to help during the crisis proved that it takes a village to get things done.
899	207	In the business world, it takes a village to make any company successful, from interns to CEOs and even volunteers.
900	207	The local fundraiser succeeded because everyone understood it takes a village to effect change and get people talking.
901	207	After having a couple of kids, I now know that raising a family truly takes something like a village.
902	207	Launching a new book take a village of support from everyone you know.
903	208	Let’s get Phoebe on board for the Madison project. After all, it is her area of expertise.
904	208	There were so many containers on board the vessel that it ran into difficulty in a ferocious storm.
905	208	Is the bride on board with the new seating plan?
906	208	The international flight took off from LAX with 325 passengers on board.
907	208	The space station has three experienced astronauts on board at any time.
908	208	Richard’s new car is fitted with an onboard Sat-Nav.
909	208	Thank goodness there was a buffet service on board because we were starving by the time made it to the station.
910	208	The committee members will have a lot to take on board after this month’s meeting.
911	209	I know she really wants the promotion, but telling the boss about my personal problems was below the belt.
912	209	Even though you girls are enemies, I think it’s below the belt to go out with her ex-boyfriend.
913	209	Intentionally injuring an opponent is definitely below the belt.
914	209	I know she really wants the promotion, but she hit below the belt when she told the boss about my personal problems.
915	209	The champ hit the contender below the belt and the crowd began to boo like fury.
916	209	Fred was hit below the belt and suffered considerably.
917	209	That’s not fair! You told them I was the one who ordered the wrong-size carpet. That’s hitting me below the belt.
918	209	Todd hit below the belt when he said it was all her fault because she had become ill during the trip.
919	209	He made a joke about her divorce which I thought was a bit below the belt.
920	209	Her remarks about his age were a bit below the belt.
921	210	It may not look impressive on the outside, but this bad boy can go from zero to sixty in about five seconds flat.
922	210	That old junker can go from zero to sixty? Yeah, right—I bet it can’t get up to 60 mph at all!
923	210	I don’t care if your car can go from zero to sixty, and I really don’t want to be in the car when it does!
924	210	No, this isn’t a demotion—I just don’t want you to go from zero to sixty right after a major surgery. Play a few games in the minors first and see how you feel.
925	210	A: "Aaah! Is that your alarm or a fire bell?" B: "Yeah, it really goes from zero to sixty on the volume, huh? Sorry about that."
926	210	I have no desire to go from zero to sixty, so I’m starting out with five pound weights.
927	210	His anger issues are really out of control. He goes from zero to sixty at the slightest provocation!
928	210	Now that some time has passed since the funeral, I’m doing a little better, but I still go from zero to sixty in a moment if something reminds me of her.
929	210	Yeah, Mom’s going to be upset that you’re home past curfew, but she’ll go from zero to sixty when she sees that you’re also drunk!
930	211	The steering is so good on this car that you can turn on a dime, even at high speeds.
931	211	The running back turned on a dime and broke the tackle.
932	211	He’s usually a nice guy, but his temper can turn on a dime sometimes.
933	211	Politicians have no loyalty to their causes—they’ll turn on a dime if it means they’ll get more votes.
934	211	This car can turn on a dime. I need a vehicle that can turn on a dime.
935	211	Employers need to be flexible and to turn on a dime in order to stay competitive.
936	211	Outdoors I heard the rain stop on a dime.
937	211	A car that will turn on a dime at high speed without turning turtle is what I want.
938	212	I’ve learned my lesson from dating actors—once bitten, twice shy.
939	212	The company’s brief but disastrous attempt was enough for them to vow never to venture into the mobile phone market again. Once bitten, twice shy.
940	212	Jill: Let’s go ride the roller coaster. Jane: No, thanks. I got really sick on one of those once—once bitten, twice shy.
941	212	I once sent in money for something I saw advertised in the back of a magazine, but the merchandise was of such poor quality I was sorry I’d bought it. I’ll never buy anything that way again; once bitten, twice shy.
942	212	I’m certainly not looking for a new boyfriend. Once bitten, twice shy.
943	212	Tokyo’s punters, once bitten, twice shy, will not come rushing back for more.
944	212	"Will she marry again, do you think?" "I doubt it—once bitten, twice shy."
945	213	A: "I’m sorry, I was only trying to explain where Tom was coming from! I didn’t mean to make matters worse." B: "Yeah, well, the road to hell is paved with good intentions."
946	213	Jane: I’m sorry. I didn’t mean to hurt your feelings; I only wanted to help you. Jane: Oh, yeah? The road to hell is paved with good intentions.
947	213	She said the road to hell was paved with good intentions, that she really had decided to hand write six dozen personal letters, but she just didn’t have the time.
948	213	The path to hell is paved with good intentions, and there are many, many pots of vitamin tablets which have been started but never finished.
949	214	I told him, "Don’t shit where you eat." But he still insisted on having an affair with his secretary, and now the scandal is ruining both his personal and professional life.
950	214	A: "I don’t want to date any of the guys in my school—I mean, it would be so awkward to have to see them all the time if we broke up!" B: "So you’re someone who believes in "don’t shit in your own nest," huh?"
951	214	Please don’t get into a relationship with anyone at your new job, OK? Don’t shit where you eat.
952	215	My father always told me never to dip my pen into the company’s ink. He said it was a sure way to ruin your career and reputation.
953	215	She was racked with guilt for dipping her pen into the company’s ink when she discovered he was married.
954	215	Carl was fired for dipping his pen into the company’s ink. Quite frankly, he’s stupid for having an affair with his boss’s wife.
955	215	The whole office was shocked to have learned about Susan and Jerry. The two dipped their pens into the company’s ink, even though they knew it was risky.
956	215	Food for thought: Never dip your pen into the company’s ink. It’s unprofessional and unethical.
957	215	She dipped her pen into the company’s ink, and it turned out to be the best decision of her life. She married her co-worker, and they became a successful business couple.
958	215	He didn’t dip his pen into the company’s ink, even though he had a crush on his colleague. I feel that he didn’t want any trouble.
959	215	They were accused of dipping their pens into the company’s ink, but they denied it. They said they were just friends and nothing more.
960	215	I don’t care if you dip your pen into the company’s ink, as long as you do your job well and don’t cause any problems.
961	215	She was tempted to dip her pen into the company’s ink but resisted. She knew it was terrible and didn’t want to burn boats.
962	216	Quit pulling my leg, I know there isn’t a Hollywood director calling me right now.
963	216	I love pulling my sister’s leg—it’s almost too easy to annoy her.
964	216	You don’t mean that. You’re just pulling my leg.
965	216	Don’t believe him. He’s just pulling your leg.
966	216	Is he serious or just pulling my leg?
967	216	I’m just pulling your leg, darling. You used to have a sense of humour.
968	216	A lot of people think this kind of painting is a leg-pull.
969	216	"You came first! You’ve won the prize" "Really? Or are you just pulling my leg?"
970	216	The news of his engagement was greeted with much leg-pulling by his friends.
971	216	They’re just pulling your leg. Relax!
972	217	Quit jerking my chain, I know there isn’t a Hollywood director calling me right now.
973	217	I love jerking my sister’s chain—it’s almost too easy to annoy her.
974	218	The blood of the covenant is thicker than the water of the womb, which is why we’re good friends.
975	218	The blood of the covenant is thicker than the water of the womb, so don’t let it get to your head.
976	218	The blood of the covenant is thicker than the water of the womb, no matter what happens here.
977	218	The blood of the covenant is thicker than the water of the womb, at the end of the day.
978	218	The blood of the covenant is thicker than the water of the womb, if you really think about it.
979	218	The blood of the covenant is thicker than the water of the womb, don’t you know.
980	218	The blood of the covenant is thicker than the water of the womb, so we’re basically family.
981	219	These companies all want to pretend like they’re your friend, but I’ve been stabbed in the back by many of them. They’ll betray you the moment it makes financial sense for them.
982	219	The gangster was stabbed in the back by his second in command because he wanted to assume control over the entire criminal organization.
983	220	Mark is such a glass-half-empty kind of guy that he will find a way to see even the best situation in a negative light.
984	220	When it comes to the state of the world, most people are glass half empty. But they forget all the progress that has been made.
985	220	I don’t like to be glass half empty. I just don’t see the point in thinking the worst of everything.
986	220	People are prepared to see the glass half full at the moment rather than half empty.
987	220	He’s a glass-half-full type of guy (= he always expects good things to happen).
1042	231	These surveys are only the tip of an iceberg of continuing study.
988	221	A: "I’ll take another beer, please." B: "Sorry, Bob, the well’s run dry. We’re waiting on our next delivery before we’ll get anymore."
989	221	The first book was wildly imaginative, full of interesting characters and plot twists. By the sixth book in the series, however, it was clear that the author’s well of ideas had run dry.
990	221	A: "Tommy’s got plenty of money in his trust fund, so he’ll be able to pay for it." B: "Nope, the well’s run dry—my parents have cut me off from accessing the account."
991	222	All it takes for a gold rush is for one prospector to strike gold.
992	222	Tara and Patti really struck gold when they developed an app that went viral.
993	222	We struck gold when we hired Ken. He brings in more money that our other three salespeople combined.
994	222	Michael Phelps has struck gold more than any other Olympian in history.
995	222	A California nurse has struck gold on a slot machine. Hitting the jackpot, she suddenly found herself 9.3 million dollars richer.
996	222	The company has struck gold with its new holiday development.
997	222	Mason struck gold in the vault, with Reeder taking the bronze, her third medal of the games.
998	222	She hasn’t always been lucky with her boyfriends, but I think she’s struck gold this time.
999	222	We’ve struck gold here. This book has everything we need.
1000	223	He rules with an iron fist, and moves swiftly to gain control over any entity that is not already in his grasp.
1001	223	She has ruled this company with an iron fist for three decades, and it’s going to be difficult for her to let go of control.
1002	223	The dictator ruled with an iron fist and terrified the citizens. My boss rules with an iron fist. I’m looking for a new job.
1003	224	That’s how to do it, team! Now you’re cooking with gas!
1004	224	Adjusting those parts made all the difference. Look how fast it goes! Now we’re cooking!
1005	224	As Bob came to the end of the piece, the piano teacher said, "Now you’re cooking with gas!" Tom (painting a fence): How am I doing with this painting? Any better? Jane: Now you’re cooking. Tom: Want to try it?
1006	225	Before we begin with the discussion, I want to make sure that all of us are on the same page.
1007	225	Let us discuss this internally first so that we are on the same page before we speak to the customer.
1008	225	I don’t think we are on the same page regarding this. I will explain to you exactly what I think, please listen to me carefully.
1009	225	The confusion arose because they were not on the same page. He was talking of one thing and was referring to something else.
1010	225	Since you were not present yesterday, I’ll quickly update you about what happened so that we are on the same page.
1011	226	You can’t keep working these 80 hour workweeks, John! You have to stop and smell the roses, or else what is all that work even for?
1012	226	Come on, Stan, wake up and smell the roses! They’re cheating you out of millions!
1013	226	I can’t believe that a crook like her is ahead in the polls to become governor. I hope for our sake that everyone wakes up and smells the roses before it’s too late.
1014	227	Eating that piece of cake is a slippery slope that could lead to you completely abandoning your diet.
1015	227	Verbal abuse is often a slippery slope that leads to physical abuse.
1016	227	The matter of euthanasia is a slippery slope with both legal and moral considerations.
1017	227	It’s a slippery slope. You give in to one demand and soon find that you’re doing exactly what they want.
1018	227	The company started down the slippery slope of believing that they knew better than the customer, with the inevitable disastrous results.
1019	227	These young people may already be on the slippery slope to criminality.
1020	227	Those of us who feared that devolution would not assuage nationalist sentiment but turn out to be the slippery slope to separatism have a good chance of being proved right.
1021	227	Starting with shoplifting, he was soon on the slippery slope towards a life of crime.
1022	228	As a parent, you learn to pick your battles with your kids so you don’t run yourself ragged with nagging them.
1023	228	The best politicians pick their battles wisely: if one becomes too embroiled in petty debates, one never gets anything done.
1024	229	I knew I was on my last legs, so I was very relieved to see the marathon’s finish line in the distance.
1025	229	Ed’s on his last legs—you should probably try to visit him in the hospital today.
1026	229	This building is on its last legs. It should be torn down.
1027	229	I feel as if I’m on my last legs. I’m really tired.
1028	229	Jackson collapsed as he left the boxing ring, clearly on his last legs.
1029	229	There was an enormous variety of patients—people who looked in perfect health and people who looked as if they were on their last legs.
1030	229	It is certainly difficult to imagine how anyone who is in any way infirm, and some of the pilgrims who make the climb are literally on their last legs, can reach the top.
1031	229	This car is on its last legs. We have to get a new one.
1032	230	I kept waiting for hours near my phone but there was no news from my daughter from the war zone yet because a watched pot never boils.
1033	230	She kept switching onto the website to check her result all morning but I guess the university has not published it yet, a watched pot never boils.
1034	230	I stopped looking at the news because a watched pot never boils
1035	230	You should go to her house and ask her about her decision to marry you. Don—t wait because a watched pot never boils
1036	230	I guess it is true that a watched pot never boils but how can I do anything else in this situation?
1037	231	If Congress doesn’t vote to extend the debt limit, a government shutdown will be just the tip of the iceberg.
1038	231	The flooding is bad, but we’re dealing with just the tip of the iceberg: a huge spate of environmental disasters are on the horizon because of climate change.
1039	231	The problems that you see here now are just the tip of the iceberg. There are numerous disasters waiting to happen.
1040	231	We get about 2,000 complaints every year and that’s just the tip of the iceberg.
1041	231	Figures show that there have been 700 official burglaries throughout the area, but police believe this is the tip of the iceberg.
1044	232	Trying to find my contact lens on the floor was like looking for a needle in a haystack.
1045	232	Terrorists don’t fit a consistent profile: you’re looking for a needle in a haystack, but the color and shape of the needle keep changing.
1046	233	No, Sarah is actually one of the smartest people in the company. She may not talk or socialize much, but still waters run deep.
1047	233	Jill: I get the impression that Nathan is not very smart. He never says anything. Jane: Don’t be so sure. still waters run deep, you know.
1048	233	He’s extremely shy and withdrawn, though it may be that still waters run very deep.
1049	233	I know he seems very quiet and content with his life, but still waters run deep, you know.
1050	234	I don’t think we can pick up where we were before you betrayed me because an elephant never forgets!
1051	234	I would be hesitant to cross him—he’s a dangerous man, and an elephant never forgets.
1052	234	A: "It’s like Mom remembers every thing I’ve ever done wrong in my life!" B: "Oh, an elephant never forgets."
1053	235	That personable new hire turned out to be a Trojan horse—she stole our intellectual property and sold it to the competitor!
1054	235	We have malware on our computer because that game you downloaded turned out to be a Trojan horse.
1055	235	Proposals for a golf course are now seen as a Trojan Horse for hotel and conference centres.
1056	235	This small reduction in the basic tax rate was merely a Trojan horse for the far more drastic cutting of the top rate from 70 to 28 per cent.
1057	235	The consultant called the intruder a "trojan horse" and said I needed yet another program to get rid of it.
1058	236	He felt like a fish-out-of-water student in the new school.
1059	237	The investigation wouldn’t be taking this long if there weren’t any real leads. Where there’s smoke, there’s fire.
1060	238	Well, this is just a shot in the dark, but I’m going to say that the answer to the question is 52.
1061	238	Hailey had absolutely no idea what the answer was for the last question on the exam, so she just took a shot in the dark and hoped for the best.
1062	238	OK, here’s a shot in the dark—is the mystery guest Countess Constance Markievicz?
1063	238	It was really just a shot in the dark when I tried to fix our washing machine, but I was actually able to get it working again on my first try!
1064	238	I had a great experience abroad, even if it was a bit of a shot in the dark taking a job in a different country.
1065	238	You need sound financial advice and a strong plan if you’re going to start your own business—you can’t just take a shot in the dark.
1066	238	It was just a shot in the dark. I had no idea I was exactly correct. Come on, try it. Even a shot in the dark may win.
1067	238	The figure he came up with was really just a shot in the dark.
1068	238	It was just a shot in the dark. I had no idea I was exactly correct.
1069	239	A: "I thought you said you’d never join social media." B: "Yeah, but everybody else has, so if you can’t beat ’em, join ’em, I guess."
1070	240	There are a lot of things that need to be completed for our project. I would suggest that we start with the low hanging fruit.
1071	240	For the new weight loss drug, the university girls in town were low hanging fruit. They are always looking for ways to lose weight.
1072	240	That company is low hanging fruit. They are in financial difficulty.
1073	241	I find it so frustrating that my wife is always willing to let the kids slide when they misbehave, meaning I have to be the bad guy and enforce the rules.
1074	241	I’ve been meaning to paint the shed all summer, but I keep letting it slide.
1075	242	Politicians have two skills: making empty promises and then passing the buck when they fail to deliver on them.
1076	242	Maybe instead of passing the buck, you should have a think about what you could be doing to improve your performance.
1077	242	Don’t try to pass the buck! It’s your fault, and everybody knows it. Some people try to pass the buck whenever they can.
1078	242	His three commanders-in-chief were arguing and passing the buck to one another.
1079	242	When it comes to teaching kids about risk, many parents are tempted to pass the buck to schools and other organizations.
1080	242	However, his apology, in this age of buck-passing and dodging, was frank and honest.
1081	242	The legislation left the main decisions to the individual states which may well pass the buck to the large cities where most of the problem is.
1082	242	The same thing happens after every disaster. All the officials involved just try to pass the buck.
1083	242	The public is tired of all this political buck-passing. They just want to know who was responsible for the decision.
1084	242	Don’t pass the buck. Stand up and admit you were wrong.
1085	243	I drew an elaborate treasure map for my daughter’s birthday, with X marking the spot where I’ve hidden her presents.
1086	243	If you look at this financial chart, X marks the spot across all of them where the company began to seriously falter.
1087	243	This is where the rock struck my car
1088	243	X marks the spot.
1089	243	Now, please move that table over here. Yes, right here
1090	243	This is where it happened. X marks the spot.
1091	244	Jane had her 15 minutes of fame when she appeared on the nightly news broadcast.
1092	244	That viral video gave Sam his 15 minutes of fame.
1093	244	I’ve seen what celebrity does to people, so I’m really not interested in getting 15 minutes of fame.
1094	245	That burger really hit the spot—I didn’t realize how hungry I was.
1095	245	You really hit the spot with that answer—good job.
1096	245	This cool drink really hits the spot.
1097	245	That was a delicious meal, dear. It hit the spot.
1098	245	Karen Grey’s latest drama hits the spot, with its honest portrait of family life.
1099	245	A cup of milky coffee hit the spot.
1100	245	I decided I wasn’t really hungry, but the coffee really hit the spot and I drank a whole pot.
1101	245	You really hit the spot with that prediction.
1102	245	I want something hot—some coffee would really hit the bull’s-eye.
1103	246	I can’t believe they sold their company for billions—they’re made in the shade now!
1104	246	If you’re born into a wealthy family, you’re made in the shade while the rest of us struggle.
1105	247	The slot machine gave me a run for my money, but, in the end, the casino was the only real winner.
1106	247	Sure, Sheila still became valedictorian, but Tim really gave her a run for her money!
1107	247	I get a run for my money at the club tennis tournament. I had a run for my money in the stock market.
1108	247	Bob got a run for his money when he tried to beat Mary at pool. Bill got a run for his money playing cards with John.
1109	247	I’ve had a good run for my money as director of this company, but now I think it’s time someone younger took over.
1110	247	They may not beat your team but they’ll certainly give you a good run for your money.
1111	248	They said they wanted to hire someone else for the job. What am I, chopped liver?
1112	248	The candidate is aiming to prove that he isn’t just chopped liver during tonight’s televised debate.
1113	248	My history teacher had a nasty way of making us feel like chopped liver whenever we got something wrong.
1114	248	A: "Mary is so smart, talented, and creative, I wish she were my best friend!" B: "And what am I then, chopped liver?"
1115	248	And who am I? Chopped liver?
1116	249	Do you want to go out to brunch tomorrow?
1117	249	Sorry, the boss is out to lunch right now. Can I leave a message?
1118	249	I received an automated email from the accountant saying that she was out to lunch.
1119	249	Jim’s been a bit out to lunch lately, don’t you think?
1120	249	Sorry, what did you say? I was out to lunch there for a minute.
1121	249	I’m sorry, but Sally Jones is out to lunch. May I take a message?
1122	249	Bill is really out of it. Why can’t he pay attention?
1123	249	Don’t be out of it, John. Wake up!
1124	249	Ann is really out to lunch these days.
1125	249	I could not think how to reply. Now he would think I was out to lunch.
1126	249	He must be the most out-to-lunch chief executive in America.
1127	249	She has talent physically but mentally she’s out to lunch.
1128	249	I respect his scholarship, but he’s out to lunch on this matter.
1129	249	Old Ted is so out to lunch these days. Seems to be losing his mind.
1130	250	The company’s closure was inevitable, as it has been circling the drain for the last six months.
1131	250	Her political career began to circle the drain after news of her affair came to public light.
1132	250	He was already circling the drain when the decision was made to take him off life support.
1133	250	Get Mrs. Smith’s son on the phone. She’s circling the drain.
1134	251	That’s the ticket, yes, please lie down. A short nap will have you refreshed in no time.
1135	251	That’s the ticket, Chuck. Great idea!
1136	251	Mary: I’ll just get ready and drive the package directly to the airport! Sue: That’s the ticket. Take it right to the airport post office. Bob: I’ve got it! I’ll buy a new computer! Bill: That’s the ticket!
1137	251	Good! That’s the ticket! Now you’re cooking with gas.
1138	252	Really? But I had sex with her just a few weeks ago, John’s simply getting my sloppy seconds.
1139	253	After stepping away from politics for nearly ten years, the former governor is coming back to the fold with his bid for the presidency.
1140	253	Danielson stated that she would be coming back into the fold as the new head coach of her alma mater’s rugby team.
1141	253	The company plans on having the former CEO come back into the fold as an advisor.
1142	254	The social worker has taken countless kids under his wing over the years, and many of them stay in contact with him years later.
1143	254	Diane didn’t know anyone when she moved out West, so I took her under my wing for a while and showed her around.
1144	254	She has taken the youngster under her wing, giving her advice and helping her prepare for the tour.
1145	254	Tanya took me under her wing when I started at the company.
1146	255	It can actually be quite shocking to finish college and enter the workforce, because suddenly you realize that you aren’t in Kansas anymore and life operates in a totally different way now.
1147	255	As we walked into the bustling streets of Delhi, we knew we weren’t in Kansas anymore.
1148	255	As someone from a small-town, you’ll know you’re not in Kansas anymore as soon as you step into Times Square.
1149	256	Her surgery went as well as we could have hoped, but she’s not out of the woods yet.
1150	256	If our sales stay strong, we should be out of the woods by the next quarter.
1151	256	When the patient got out of the woods, everyone relaxed. I can give you a better prediction for your future health when you are out of the woods.
1152	256	As soon as her temperature is down, she’ll be out of the woods.
1153	257	John’s performance on the field was incredible. He had the balls of steel to attempt that risky move, and it paid off.
1154	257	Sarah’s presentation was outstanding. She handled the tough questions with balls of steel, leaving everyone impressed.
1155	257	When faced with adversity, she showed her balls of steel, never backing down from her beliefs.
1156	258	I thought I made a mistake, a classic case of having eyes bigger than my stomach.
1157	258	If Michael Gilbert has one regret about the early stages of his company it might be having “eyes bigger than my stomach.”
1158	258	However, Prince William clearly has eyes bigger than his stomach as choosing what they’re going to tuck into can be a nightmare.
1159	258	Although he has quick feet/hands to shoot gaps, his eyes are bigger than his stomach and he doesn’t have a deep tool box as a rusher, relying more on his first step and motor.
1160	259	The doe-eyed children were gazing at the shelves of candy.
1161	259	We took advantage of doe-eyed investors.
1162	260	My daughters are all snug as a bug in a rug watching a movie together.
1163	260	I hate the cold weather, so I look forward being snug as a bug in bed.
1164	260	The bedroom in Aunt Jane’s house was cold, but after she wrapped me up in four or five quilts and put a stocking cap on my head, I was snug as a bug in a rug and ready to go to sleep. Alan: Are you warm enough? Jane: Yes, I’m as snug as a bug in a rug.
1165	260	Kitty was curled up in bed, as snug as a bug in a rug.
1166	261	After her promotion, Janet spent the rest of the day looking like the cat that ate the canary.
1167	261	Look at those kids with their ice creams—the cats that ate the canaries!
1168	262	The doctor said the condition is called aceruloplasminemia. Quite the tongue twister, huh?
1169	262	In the game, you see who can say the silly rhyming tongue twister, like "She sells seashells down by the seashore," without getting tongue-tied.
1170	263	With stagnant sales amid a volatile market, this marketing effort is our last roll of the dice to try to keep the company open.
1171	263	I think it’s clear that this policy is a roll of the dice by the government as a last-ditch effort to combat the housing crisis.
1172	263	I think it’s a roll of the dice to invest in that company right now. I would hold off until things get a bit more stable in the financial markets.
1173	263	I knew it was a roll of the dice, but I decided to apply anyway and see what happened.
1174	263	I’ve lodged an appeal, but it’s honestly just a roll of the dice whether it will be accepted.
1175	263	For decades, the state reliably voted for the same political party. Now it’s suddenly a roll of the dice which candidate they will elect.
1176	264	When he made the decision to make his selecting passion a full-time endeavor, everyone said, “James, you’ve lost your marbles.”
1177	264	Thank God, at 80, I haven’t lost my marbles, and my memory is as sharp as it was when I was a teenager.
1178	264	I thought he’d lost his marbles when he started raving about how the government was trying to get him.
1179	264	Sadly, after my grandmother’s stroke, she began losing her marbles gradually.
1180	264	Because of my recent lack of sleep, I feel like I’ve completely lost my marbles.
1181	264	I’ll tell you, even if you might think I’ve lost my marbles.
1182	265	Borrowing money to gamble is like playing with fire; you’re bound to get burned at some point.
1183	265	Ignoring the safety precautions at a construction site is straight-up playing with fire.
1184	265	Drinking and driving isn’t just illegal; it’s playing with fire, and it’s not just your life you’re putting in danger.
1185	265	Sneaking into that old, abandoned factory might seem thrilling, but you’re just playing with fire.
1186	265	Skipping my anxiety medications can be like playing with fire; it’s too risky for me to even try.
1187	265	Ted and Dianna knew that hacking into the system was playing with fire, but they did it anyway.
1188	265	Neglecting the terms of the contract might seem insignificant now, but I’m telling you, you’re playing with fire.
1189	265	Spreading rumors around the workplace about colleagues is playing with fire; it can quickly backfire.
1190	265	You’re not wearing safety glasses when cutting that glass? You’re playing with fire.
1191	266	Why are you calling me in the dead of night? Can’t this wait till morning?
1192	266	A: "What are you doing walking through the woods in the dead of night?" B: "I could ask you the same question, sir!"
1193	266	Don’t worry, if the baby ends up being born in the dead of night, I’ll call you first thing in the morning.
1194	266	She crept in at dead of night, while they were asleep.
1195	267	The incumbent mayor’s re-election campaign is getting underway amidst a perfect storm of allegations and news stories about corruption, tax evasion, and racketeering within the city’s government.
1196	267	The oil crisis has set off a perfect storm in the Middle East, where foreign leaders have depended on its economic stability to keep their warring countries from absolute chaos and anarchy.
1197	268	Don’t cut corners on this project—it has to be done thoroughly, no matter the cost.
1198	268	If you cut corners and don’t apply a top coat, then your nails probably are going to chip faster.
1199	268	You’re the company’s safety supervisor—you can’t cut corners on expensive safety equipment!
1200	268	They’re always finding ways to cut corners.
1201	268	I won’t cut corners just to save money. I put quality first.
1202	268	Don’t try to cut corners as you’ll only be making work for yourself later on.
1203	268	He accused the Home Office of trying to save money by cutting corners on security.
1204	268	It’s precisely this sort of corner cutting that causes the problems.
1205	268	Corner-cutting contractors build tiny classrooms and narrow corridors.
1206	268	Don’t be tempted to cut corners when doing a home decorating job.
1207	269	Who’s that tall drink of water who just walked in? He’s about a head taller than anyone else in here!
1208	270	I took the road less traveled when I decided not to go to college, unlike all of my siblings.
1209	270	Quitting your job to do art full-time is certainly the road less traveled, but has it made you happier?
1210	271	It only took three months to realize I was a square peg in a round hole at the firm. I guess I just don’t buy into the whole corporate hierarchy of modern business.
1211	271	John was a bit of a square peg in a round hole throughout high school, but when he went to college he found all sorts of people he could relate to.
1212	271	You’ll be a square peg in a round hole at that office if you don’t stay till 8 o’clock every night.
1213	271	I feel like a square peg in a round hole at my office. Everyone else there seems so ambitious, competitive, and dedicated to the work, but I just want to make a living. Trying to teach me math is like trying to fit a square peg into a round hole. I’m convinced my brain is not built right to understand algebra.
1214	271	Taylor is clearly the wrong man for the job—a square peg in a round hole.
1215	271	With all his players fit, the team’s manager will be in the unfamiliar position of not having to fit a square peg into a round hole.
1216	271	Forcing a square peg into a round hole is not a very useful exercise—you need to make sure you get the right person for the job.
1217	271	The system too often leads to round pegs being appointed to square holes.
1218	271	I’m a square peg in a round hole. Maybe I am meant to be eccentric.
1219	272	How much sugar did you give the kids? They’re bouncing off the walls!
1220	272	A: "Why are you bouncing off the walls?" B: "I just got great news!"
1221	272	The kids have been bouncing off the walls ever since we told them we’re going to Disney World over Christmas break.
1222	272	After another cup of coffee Holly was bouncing off the walls.
1223	272	He was bouncing off the walls so I told him to go out for a walk.
1224	275	He walked from Grand Central to Eighth Street, kids hitting New York go downtown like lemmings to the sea, and he was a confirmed New Yorker by Thirty-fourth.
1225	276	Thank you for helping me move into the new house, you are truly a scholar and a gentleman.
1226	276	Mom, Grandpa just looked at my report card and called me "a scholar and a gentleman"—is that a good thing?
1227	277	Oh, that project was gone with the wind once the CEO voiced his concerns about it.
1228	277	We have to come in on a Saturday to work on this? Yeah, my interest is gone with the wind now!
1229	277	Can you take the trash out, please? After dealing with the kids all day, my energy is just gone with the wind.
1230	277	Gone with the Wind.
1231	277	Everything we worked for was gone with the wind.
1232	277	There will be more promises, and the promises of the previous year will have gone with the wind.
1233	278	Jokes like that were edgy a while ago, but they’re just old hat at this point.
1234	278	People think my flip phone is a bit old hat, but it still works after all these years!
1235	278	That’s a silly idea. It’s old hat.
1236	278	Hardly anybody uses typewriters anymore. That’s just old hat.
1237	278	The technology is a bit old hat nowadays.
1238	278	I think that kind of painting’s a bit old hat now, isn’t it? I wanted to do something quite different.
1239	278	This is supposed to be a new method of learning English, but frankly, it’s a bit old hat.
1240	278	That’s just old hat. This is the modern world!
1241	279	Our teacher does not fit the mold of someone who volunteers to help homeless people every weekend.
1242	280	I don’t know, man, the fact that he lied to you just leaves a bad taste in my mouth.
1243	280	The way they conducted the interview left a bad taste in my mouth. I don’t think I’d accept the job even if they offered it.
1244	280	The whole business about the missing money left a bad taste in his mouth.
1245	280	It was a very nice hotel, but something about it left a bad taste in my mouth.
1246	280	Some of the magazine’s jokes about women leave a bad taste in the mouth.
1247	280	I’m not staying where I’m not wanted. The whole thing leaves a sour taste in my mouth.
1248	281	She thinks you started that rumor about her—that’s why she’s been giving you the cold shoulder all day.
1249	281	If he’s been giving you the cold shoulder, just start ignoring him for a while. See how he likes it.
1250	281	I must have done something really embarrassing at the office party on Friday, because everyone showed me the cold shoulder on Monday.
1251	281	I think I’m too old to be wearing a cold shoulder top like that!
1252	281	Ugh, my mom is being so annoying. A cold-shoulder top is not scandalous—it covers literally every other part of my upper body!
1253	281	I do think cold-shoulder tops are dumb, but they are useful in one situation—when you need to get a shot at the doctor!
1254	281	If you greet her at a party, you’ll just get the cold shoulder.
1255	281	I thought that Sally and I were friends, but lately I’ve been getting the cold shoulder.
1256	281	The hostess cold-shouldered me, so I spilt my appetizers in the swimming pool.
1257	281	Tiffany cold-shouldered the guy who was trying to flirt with her.
1258	282	I thought it was obvious that my comments were tongue in cheek, but I guess I delivered them with too much of a straight face, because it seems like I offended several people at the party.
1259	282	The zombie movie, very much with tongue in cheek, gives a clever criticism of American consumerism.
1260	282	She peppered her speech with tongue-in-cheek observations about the ineptitude of the company’s upper management.
1261	282	I think people are taking all this more seriously than we intended. It was supposed to be tongue in cheek.
1262	282	If Howard said that, it must have been with tongue in cheek.
1263	282	Labour MPs, some with their tongue firmly in their cheeks, judged the result to have been a great success.
1264	282	The advert was meant to be a light-hearted, tongue-in-cheek approach. We never intended to offend anyone.
1265	282	I never know if Charlie’s serious or if he’s speaking with tongue in cheek.
1266	282	a tongue-in-cheek remark
1267	282	My comment was made TIC. Don’t take me seriously.
1268	283	Where there’s a will, there’s a way, and the relentless pursuit of her goals proved this true.
1269	283	He faced many roadblocks on his path to success, but his determination proved that where there’s a will, there’s a way.
1270	283	Where there’s a will, there’s a way is their motto, and they always find solutions to overcome obstacles.
1271	283	With determination and perseverance, they proved the saying where there’s a will, there’s a way right.
1272	283	They firmly believed that where there’s a will, there’s a way, and their achievements are a testament to this.
1273	284	A: "Oh, excuse me! I’m so sorry for knocking over your glass!" B: "It’s OK, it was empty. No harm, no foul!"
1274	285	In order to achieve true independence, developing countries must cut the cord and stop asking for financial aid from the developed countries.
1275	285	"Thanks for all the help, mum, but it’s time to cut the cord."
1276	285	His rich girlfriend cut the cord, and now he needs to get a job.
1277	285	If he didn’t cut the cord with his business partner, the company would not have gone bankrupt.
1278	285	After months of poor performances, the team finally cut the cord and parted ways with the manager.
1279	285	Jessica needs to cut the cord or suffer the consequences of allowing David to take over her business.
1280	286	I have to get up early for work tomorrow, so I think I’d better hit the hay.
1281	286	I have to go home and hit the hay pretty soon.
1282	286	Let’s hit the sack. We have to get an early start in the morning.
1283	286	I think it’s time to hit the sack.
1284	286	Time to go home and hit the hay!
1285	287	The young men of this city getting caught up in gang violence have the shortest lifespans of anyone in the state. You live by the sword, you die by the sword.
1286	287	For years the senator took bribes and skimmed profits from kickbacks all over his state, until finally the FBI put together a sting against him that ended up putting him away for life. Live by the sword, die by the sword.
1287	287	The gang leader who organized so many murders was eventually murdered himself. Live by the sword, die by the sword.
1288	287	Bill liked to spread damaging gossip about other people, until he lost all his friends because of some gossip that was spread about him. Live by the sword, die by the sword.
1289	288	My roommate in college used to hang a hat on the door handle outside our room if she was knocking boots with someone inside.
1290	288	I could tell he was more interested in knocking boots than in having any kind of serious relationship.
1291	288	He said he wanted to knock boots with her.
1292	289	I heard that Katie and Brad bumped uglies last night after leaving the bar together.
1293	289	He’s not a long-term relationship type of guy. He clearly just wants to bump uglies with you.
1294	289	A: "I think those two bumped uglies last night after the party." B: "Well, they did spend the whole night flirting!"
1295	289	You been bumpin’ uglies with Joannie again?
1296	290	Ah, I see you got your ears lowered. It looks good!
1297	290	I’m thinking of getting my ears lowered—my hair’s just too long in this hot weather.
1298	290	Come on, the kid’s hair is in his eyes! It’s time for him to get his ears lowered.
1299	291	Please stop dragging your feet, you’re going to wear out the soles of your shoes.
1300	291	Now that my toddler can walk, she’ll either run at full speed or drag her feet—there is no speed in between.
1301	291	Do you think Grandpa drags his feet like that because he’s afraid of falling?
1302	291	We can’t be late for the dentist, so quit dragging your feet and get in the car!
1303	291	Come on, I know you’re dragging your feet to avoid working on your book report.
1304	291	A: "You can’t drag your feet on this anymore." B: "I know, but I’m just so scared that I’ll make the wrong decision."
1305	291	We can’t afford to drag our feet until a species is at the brink of extinction.
1306	291	How much longer will the government go on dragging its feet about whether to invest more money in the railways?
1307	292	Poor Jeff left the meeting with his tail between his legs after being called out on all his miscalculations.
1308	292	The former star walked off, with tail between legs, after striking out for the third time.
1309	292	I ran out of money, lost my job, my house, my girlfriend. I came home to Sydney with my tail between my legs.
1310	292	When Emma had left America last, it had been with her tail between her legs.
1311	292	They thought they would win easily, but they’ve gone home with their tails between their legs.
1312	293	I plan to spend the day cleaning so that this place is spick and span when my mother-in-law arrives.
1313	294	You know, you can try to get to know the girls you date before you have a roll in the hay.
1314	294	The Poisonwood Bible He just treats me like his slave-girlfriend-housemaid, having a roll in the hay when he feels like it and then running off doing God knows what for months at a time.
1315	295	The tech company’s products run the gamut from home appliances to computer modules for spacecraft.
1316	295	She wants to buy the house, but her requests run the gamut from expensive new carpeting to completely new landscaping. His hobbies run the gamut from piano repair to portrait painting.
1317	295	Russia’s hotels run the gamut from opulent citadels run as joint-ventures with foreign firms to seedy pits inhabited by mobsters.
1318	296	Come on, your watch is right here, Liz! If it was a snake, it would’ve bit you!
1319	297	And the way she looked at me when I mentioned her father in my speech? Yeesh, if looks could kill.
1320	297	Did you see the way she looked at me? If looks could kill...
1321	297	If looks could kill... What a nasty glare she gave me.
1322	297	If looks could kill, she thought, seeing the expression that came over his face when he saw her, she’d be dead on the pavement.
1323	297	I don’t know what I’ve done to upset him, but if looks could kill...
1324	298	I noticed the bride looking daggers at the best man as he started making vulgar jokes during his speech.
1325	299	Hey, it’s no skin off my back if you want to get a tattoo. I’m just saying that it’s something you may regret someday.
1326	299	We all knew that the head chef was stealing from the kitchen, but it was no skin off our backs so we just kept our mouths shut.
1327	299	A: "Do you mind if I store some of my stuff in your garage for a while?" B: "Eh, it’s no skin off my back."
1328	300	The boss offered a 10% bonus as a carrot on a stick to whomever sold the most units by the end of the month.
1329	300	I always allow myself a chocolate bar as a carrot on a stick to motivate me to go to the gym each day.
1330	300	In my experience, employees are not terribly motivated by an arbitrary carrot on a stick.
1331	301	We are all different, each one of us has their own unique skills, talents and interests; comparison is the thief of joy, let’s take joy in our talents, and the talents of others without comparing them.
1332	301	What matters is that you try, comparison is the thief of joy insofar as you expect to perform as well as somebody else who has much more experience, don’t compare your results; compare your attitude.
1333	301	Comparison is the thief of joy only if we measure our worth by how well we measure up to others.
1334	302	Are you sure it doesn’t bother you how much older I am? I feel like people are judging me for robbing the cradle.
1335	302	I hear that Bill is dating Ann. Isn’t that sort of robbing the cradle? She’s much younger than he is. Uncle Bill
1336	302	who is nearly eighty
1337	302	married a thirty-year-old woman. That is really robbing the cradle.
1338	302	She robbed the cradle when she married me.
1339	302	Tim, you’re such a cradle snatcher. She’s like ten years younger than you!
1340	304	Tom’s been nothing but a shell of his former self ever since the accident. His bubbly, outgoing personality is gone, replaced by constant gloom and cynicism.
1341	304	The mass emigration of workers from the town during the recession has left it a mere shell of its former self.
1342	304	The company used to be at the top of the industry, but after years of bad decisions and poor management, it’s little more than a shell of its former self now.
1343	305	The government has blamed the recent unrest on foreign agitation, but they’ll soon realize that the call is coming from inside the house.
1344	305	You’re always complaining that she’s too self-centred. Dude, the call is coming from inside the house!
1345	306	After hearing so much opposition to his proposed construction project, the developer came out swinging at the town hall meeting.
1346	306	They may be underdogs in this series, but you can be sure that they’ll come out swinging.
1347	306	There’s no need to come out swinging—it was just a joke. Sheesh!
1348	307	I know Sarah looks on our childhood with rose-colored glasses, but I can’t put aside how difficult my parents’ failing marriage was for all of us.
1349	307	Despite doing worse every quarter for the last two years, our boss keeps seeing the business through rose-colored glasses.
1350	307	You need to take off your rose-colored glasses for a moment and realize that there are serious problems in the world that need fixing.
1351	308	The use of satellite technology has helped us cut through the fog of war, reducing our uncertainty regarding enemy troop movements in relation to our own.
1352	308	Our assessment of the enemy’s military forces was obscured due to the fog of war, leading us to be vastly outnumbered during battle.
1353	309	She is the love of my life. For her, I’ll go the whole nine yards.
1354	309	The mountain trail was a difficult one, but I wanted to go the whole nine yards.
1355	309	We have watched every single episode of this serial, from the first to the final one, the whole nine yards.
1356	309	He has a toolkit with every kind of tool in all sizes—jacks, wrenches, screwdrivers—the whole nine yards.
1357	309	I’ll do whatever it takes to make my venture a successful one—I’ll go the whole nine yards.
1358	309	The story was interesting, but we had to leave midway. We didn’t get the whole nine yards.
1359	309	This is going to be difficult; we want a person who can go the whole nine yards.
1360	309	It was an adventurous tour, but we didn’t go the whole nine yards.
1361	310	What on earth have you done to your grandmother’s beautiful wedding dress? Oh my gosh, she would be turning over in her grave to see it ruined like this!
1362	310	I’m sure your grandfather is turning over in his grave, considering the atrocious way you’ve been running the company he built himself.
1363	310	Come on, we’re sisters—Mom would be turning over in her grave if she knew we’ve been fighting like this.
1364	311	It should have been like shooting fish in a barrel, but convincing them to increase their investment is proving a lot trickier than we expected.
1365	311	Picking personal flaws of the president to mock in your comedy routing is like shooting fish in a barrel.
1366	311	Jane’s a good mechanic. Changing a tire is like shooting fish in a barrel, for her.
1367	311	That comedian has an easy job. Making fun of politicians is like shooting fish in a barrel.
1368	311	His criticism of US TV news is like shooting fish in a barrel.
1369	311	I admire his humour, but I think he’s shooting fish in a barrel. With more discipline, he might convince some viewers who aren’t already converted.
1370	311	Marksmen were using our satellite dishes for target practice. We felt like fish in a barrel.
1371	311	I fear that’s the urgency of greed. Picking cultivated berries is like shooting fish in a barrel.
1372	312	The deadline really lit a fire under us—we never would have gotten all that work done otherwise.
1373	312	Something must have lit a fire under Jenna—she has really started taking her schoolwork seriously.
1374	313	How am I supposed to forget about my old flame if I keep seeing her around town?
1375	313	Yeah, Ben is his old flame—they dated last summer.
1376	313	I don’t want to go that party, not if my old flame is going to be there!
1377	313	Last week Alec was seen dining with his old flame Janine Turner in New York.
1378	313	My mother has an old flame who sends her a bottle of perfume once a year.
1379	314	I can’t believe you left the oven on! Do you want the house to go up in smoke?
1380	314	Firefighters responding to the call arrived to find the building already up in smoke.
1381	314	The entire business is up in smoke following a series of catastrophic investment blunders.
1382	314	My presentation went up in smoke when the slideshow stopped working.
1383	314	The team’s hopes for a championship title have gone up in smoke following their semifinal loss to their cross-state rivals.
1384	314	Any illusions I had of being successful are up in smoke now.
1385	315	When the opposing soccer team started playing aggressively, our coach told us to fight fire with fire and not back down until we won.
1386	315	Our company CEO decided to fight fire with fire, launching a marketing campaign that targeted our competitor’s weaknesses, their ego.
1387	315	If someone is spreading rumors about you, don’t fight fire with fire by doing the same; take the high road and talk it out with the person.
1388	315	Karen was determined to fight fire with fire and confronted her co-worker about their constant passive-aggressive behavior toward her.
1389	315	Sometimes you just need to fight fire with fire and put up an even bigger fence than your annoying neighbor.
1390	316	The automated messaging process is firing on all cylinders now that we’ve solved the bouncing issue.
1391	316	I’ll be firing on all cylinders after I’ve had my coffee.
1392	316	The new website will be firing on all cylinders once we get the comments section up and running!
1393	317	The lion’s share of the credit must go to our development team, who have worked tirelessly to bring this product to market before the holiday season.
1394	317	Even though we’re all talented, it’s always our youngest brother who gets the lion’s share of our parents’ praise and attention.
1395	317	I earn a lot, but the lion’s share goes for taxes.
1396	317	The lion’s share of the surplus cheese goes to school cafeterias.
1397	317	Their athletes won the lion’s share of the medals.
1398	317	While Gladys was given the lion’s share of their mother’s attention, Mary and her two younger brothers enjoyed their freedom.
1399	317	Rich countries generally seize the lion’s share of trade.
1400	317	The lion’s share of the awards have gone to American stars again.
1401	318	We’re going to be late—pedal to the metal!
1402	318	Pedal to the metal, boys—we need to get these packages shipped by the end of the day.
1403	318	It would normally take us three days driving to New York from Colorado, but with my brother putting the pedal to the metal, we made it in two.
1404	318	We’re going to be late—put the pedal to the metal!
1405	318	Put the pedal to the metal, boys—we need to get these packages shipped by the end of the day.
1406	319	I’ve been working on this book for over a year, and I’m getting nowhere with it. I think I’m ready to throw in the towel.
1407	319	After trying their hand in the mobile market for just a few years, the company is already throwing in the towel after finding very little success.
1408	319	When John could stand no more of Mary’s bad temper, he threw in the towel and left. Don’t give up now! It’s too soon to throw in the sponge.
1409	319	Klara’s support, when even her son’s trainers wanted to throw in the towel, was crucial.
1410	319	One day I will be brave enough (or fed up enough) to chuck in the towel and start again.
1411	319	You’re not the kind of man who throws in the sponge. You’re a fighter and it’s your fighting spirit which is going to save you.
1412	319	It’s a bit early to throw in the towel—you’ve only just started the job.
1413	319	The candidate who was exposed by the press as a former pickpocket tossed in the sponge in a tearful press conference.
1414	319	I’m done! I’m tossing in the sponge!
1415	320	I’m sorry I snapped at you earlier, I think I just woke up on the wrong side of the bed today.
1416	320	Jeez, the boss has been in a really bad mood all day. I guess he must have woken up on the wrong side of bed!
1417	321	I was always looked down on as a kid because I grew up on the wrong side of the tracks.
1418	321	His mother didn’t want him dating anyone from the wrong side of the tracks.
1419	321	I’m glad I’m from the wrong side of the tracks. I know what life is really like.
1420	322	As you might imagine, a 17-1 loss was a dumpster fire.
1421	322	That intern spilled coffee on himself yesterday and accidentally laminated his tie today. He’s a total dumpster fire.
1422	322	I know you feel like your life is a dumpster fire, but plenty of people lose jobs and go on to be very successful.
1423	323	For over a decade, our organization has been in the front line of advocating for those suffering from poverty.
1424	323	The esteemed neuroscientist has been in the front lines of researching treatments and cures for Alzheimer’s disease.
1425	324	Please calm down, you’re just crying over spilt milk. We already submitted the report, so we can’t fix it now.
1426	324	A: "Why is Hannah so upset?" B: "Oh, she’s just crying over spilt milk. She just fell down and ripped her stockings—she’ll be fine."
1427	324	We were pretty disappointed to have lost the championship game, but there’s no use crying over spilt milk. We just have to train harder for next season!
1428	326	All right, I raise the white flag—you win the game.
1429	326	That attack totally decimated us, and we were forced to raise the white flag.
1430	327	When the heavyweight champion boasted that nobody could beat him, no one expected this newcomer to throw down the gauntlet.
1431	327	Someone finally threw down the gauntlet to the boss regarding the oppressive working conditions in the office.
1432	327	We’ll never make any progress on this issue if we don’t have members of congress willing to throw down the gauntlet.
1433	327	When Bob chal— lenged my conclusions, he threw down the gauntlet. I was ready for an argument. Frowning at Bob is the same as throwing down the gauntlet. He loves to get into a fight about something.
1434	327	The largest teaching union yesterday threw down the gauntlet to the Government, threatening strikes if their demands are not met.
1435	327	He has laid down the gauntlet and presented us with two options which appear to be non-negotiable.
1436	327	They have thrown down the gauntlet to the Prime Minister by demanding a referendum.
1437	328	An internship might not sound very interesting, but it’s a great way to get your foot in the door at this company.
1438	328	I knew that I could prove myself to be a valuable asset to the CEO, if only I could get my foot in the door.
1439	328	Good luck getting a foot in the door in Hollywood!
1440	328	I think I could get the job if I could only get my foot in the door.
1441	328	It pays to get your foot in the door. Try to get an appointment with the boss.
1442	328	I really wanted to be a photographer and the only reason I took the job was because I thought it might help me get a foot in the door.
1443	328	Temping is a good way to get your foot in the door.
1444	328	The company said it issued the low bid because it wanted a foot in the door of a potentially lucrative market.
1445	328	It’s difficult to get your foot in the door as a young actor without any experience.
1446	328	aggressive, foot-in-the-door sales techniques
1447	329	Oh, I think she had one foot out the door for months before we actually broke up. Whenever I would express interest in moving in with her, she would get very nervous and change the subject.
1448	329	It seems like many people nowadays just sees their jobs as steppingstones to the next opportunity, with one foot already out the door from the moment they arrive.
1449	330	I studied graphic design in college, but I’ve been dipping my toe into writing fiction lately.
1450	330	I’ve always wanted to travel the world, but I’ve never left the US. I’ll dip my toe in it this summer, though, with a short trip to Toronto.
1451	330	My daughter is pretty nervous, so I’m glad she gets to dip her toe into kindergarten with a classroom visit next week.
1452	331	I want to test the water before I make the proposal at the general meeting. Do you think you can float the idea to the boss and gauge his reaction?
1453	331	You better test the waters before you fully commit to that plan.
1454	331	I was a bit sceptical and decided to test the water before committing the complete management team.
1455	331	It’s hard to make a comment until we test the water at the party conference.
1456	331	This placement period in a company can provide an excellent opportunity to test the waters without long-term commitment.
1457	331	Test the water. Rent a motor caravan for a few days and see how you like it before buying one of your own.
1458	331	Your idea might not be popular with people, so before you start marketing it you should test the waters.
1459	332	My father had this curious strategy of always playing the field when he bet on horse races. Never worked for him, though.
1460	332	I played the field a bit during college, but I prefer having a steady relationship.
1461	332	When Tom told Ann good-bye, he said he wanted to play the field.
1462	332	He said he wanted to play the field while he was still young.
1463	332	He gave up playing the field and married a year ago.
1464	332	He hasn’t any steady. He plays the field—blonde, brunette, or what have you.
1465	332	He told me he didn’t want to get married yet because he was having too much fun playing the field.
1466	333	It always takes me back to summertime as a kid when I hear an umpire shout "play ball!"
1467	333	If you play ball, we’ll be able to reduce your sentence from eight years to just two.
1468	333	Just play ball and do what they say, and nobody will get hurt!
1469	333	If they still won’t play ball with us, we will have no choice but to take them to court.
1470	333	They thought they could use him for their propaganda, but he refused to play ball.
1471	333	We need their help, but will they play ball?
1472	333	So he won’t play ball, eh? He’ll soon realize he can’t manage without us.
1473	333	The opposing attorneys refused to play ball with us.
1474	334	I’m not sure which marketing strategy to use, so I’m just throwing spaghetti at the wall to see what works.
1475	334	My boss always throws spaghetti at the wall and hopes something will stick.
1476	334	We tried a few different approaches to the problem, but it felt like we were just throwing spaghetti at the wall.
1477	334	I will try a few different things and see if they work. I guess you could say I’m throwing spaghetti at the wall.
1478	335	He was tempted to stay all night, but remembering the proverb about the watched pot, he forced himself to leave, locking the room behind him.
1479	335	When we are concentrating on the duration of an event, time seems to pass inexorably more slowly than normal, in line with the phrase "a watched pot never boils".
1480	336	That’s all she wrote for the defending champions, who fall just short of bringing home the title a second time.
1481	336	I’m sorry, Ben, but the board’s decision is final. That’s all she wrote, I’m afraid.
1482	336	That’s what she wrote for the defending champions, who fall just short of bringing home the title a second time.
1483	336	Here’s the last one we have to fix. There, that’s all she wrote. That’s what she wrote. There ain’t no more.
1484	336	That was all she wrote. He got hurt, and he didn’t play much anymore.
1485	336	The snap was a little high, and I tilted up for a second and that’s all she wrote, I took my eye off the ball.
1486	336	And that’s all she wrote for today, folks, because it’s time for me to go.
1487	336	All you have to do is point and shoot and that’s all she wrote.
1488	336	Here’s the last one we have to fix. There, that’s all she wrote.
1489	337	People say you must be humbled and I’m like no, my head’s so big I can’t fit it through the door. I’m not sure how I’m going to fit my head through the door.
1490	338	It looks as though congress is going to kick the can down the road again on the debt ceiling issue, but they’ll have to find a lasting solution eventually.
1491	339	I want to help John out on his project, but I know it’s his baby, so I don’t want to step on his toes in any way.
1492	339	Look, you’re going to have to step on a few peoples’ toes if you want to get ahead in this business.
1493	339	Please don’t step on my toes as you walk by.
1494	339	You’re sure I won’t be stepping on her toes if I talk directly to her supervisor? I didn’t mean to tread on your toes.
1495	339	"Small shopkeepers know who sells what", Sue explains, "so they don’t step on one another’s toes."
1496	339	She’s already seeing Dr Simmonds—I can’t tread on his toes.
1497	339	It was no wonder, with such a complicated system, that I was stepping on toes from morning to night.
1498	340	I’ve read the handwriting on the wall—the company is going under, and I’m not about to go down with it.
1499	340	As usual, the politicians are refusing to read the writing on the wall when one of their foolish plans is obviously about to crash and burn.
1500	341	No one had anything negative to say when I first pitched this idea, but now people are coming out of the woodwork to criticize it.
1501	341	Ever since Liam won the lottery, his so-called relatives have been coming out of the woodwork.
1502	341	If you tell anyone that the pop star is staying here, people will start to come out of the woodwork just to get a glimpse of her.
1503	341	People are starting to come out of the woodwork to talk about fraudulent practices in the industry.
1504	341	The worst aspect of their decision for Britain is that it will now bring anti-Europeans crawling out of the woodwork once more.
1505	341	When he won the lottery, all sorts of distant relatives came out of the woodwork.
1506	342	I’ll be sad to sell this house. We’ve lived here ever since we got married, and we raised all our kids here. Boy, if these walls could talk.
1507	342	Over the course of two hundred years, this manor has served as the home of a wealthy aristocrat, the office of a seditious printing press, the headquarters for the women’s suffrage movement, and a speakeasy. Let me tell you, folks, if these walls could talk!
1508	343	I would love to be a fly on the wall in John’s house when he finds out his wife bought a new car without telling him.
1509	343	I so wish I could be a fly on the wall at a glamorous event like the Oscars!
1510	343	Man, I wish I could be a fly on the wall in that meeting. I can’t hear much of anything just eavesdropping out here!
1511	343	I’d love to be a fly on the wall at their team meetings.
1512	343	What I’d give to be a fly on the wall when Draper finds out what’s happened to his precious cargo!
1513	343	For six months, a BBC film crew worked on a fly-on-the-wall documentary about their forthcoming marriage.
1514	343	I’d love to be a fly on the wall when the committee is discussing the report I wrote!
1515	343	fly-on-the-wall documentaries (= in which people are filmed going about their normal lives as if the camera were not there)
1516	344	Let’s talk in my office—out here, the walls have ears.
1517	344	Jill: Did I tell you what I found out about Fred? He
1518	344	Jane: Shhh! Walls have ears. Don’t say anything about our business dealings in here. Walls have ears.
1519	344	Take care and watch what you say. The walls have ears.
1520	344	You’d better keep your voice down. Walls have ears, you know.
1521	344	The walls have ears, so be careful about what you say.
1522	345	This is boring, let’s blow this popsicle stand and find something else to do.
1523	345	I graduate in six months, then it’s time to blow this popsicle stand.
1524	345	A: "You’re not having fun either?" B: "No, this concert is so lame. Ready to blow this popsicle stand?"
1525	345	This is boring—let’s blow this popsicle stand and find something else to do.
1526	345	Let’s blow this popsicle stand before all the kids from the middle school show up.
1527	346	But it’s this point in the film where the wheels fall off the story, and the whole thing ends up looking like a big, unfunny joke.
1528	346	Where the wheels fall off for most people is the failure to set aside any meaningful savings towards a pension or a mortgage.
1529	347	Why is this guy sitting on my tail when I’m already going over the speed limit?
1530	347	The cops are definitely on our tail now—we have to turn ourselves in!
1531	347	Hey, slow down! It’s dangerous to be on someone’s tail like that on the highway.
1532	348	Hey, I have a bone to pick with you! Why didn’t you put gas in my car after you borrowed it?
1533	348	Uh oh, the boss looks like she’s got a bone to pick. I wonder who screwed up this time.
1534	348	Jerry, we’ve got a bone to pick with you about how you leave your dirty dishes in the sink for days at a time.
1535	349	This horse has been my constant companion for the last 15 years on the ranch, but now I think it’s about time to put him out to pasture.
1536	349	You ought to put that old donkey out to pasture, don’t you think?
1537	349	The CEO shaped the company into what it is today, but she’s getting on in years and the board of directors has decided to put her out to pasture.
1538	349	I got through my entire graduate degree on this clunky old laptop, but I think it’s finally time to put it out to pasture.
1539	349	Please don’t put me out to pasture. I have lots of good years left.
1540	349	This vice president has reached retirement age. It’s time to put him out to pasture.
1541	350	This job is such a ball and chain, I can’t wait to quit and start freelancing.
1542	350	As John got older, he felt that his decision to settle down and have a family became a ball and chain that prevented him from pursuing his dream to travel the world.
1543	350	I wish I came from a wealthy family and just had money, you know? Having to go to work every day is a real ball and chain!
1544	350	We could tell Jimmy was joking when he called his wife the old ball and chain, but I think he does feel a bit like he doesn’t get out enough.
1545	350	I’d love to come, but the old ball and chain is insisting we spend Saturday shopping for new furniture.
1546	350	I couldn’t help but roll my eyes when my co-worker started complaining about how "the old ball and chain" wouldn’t let him watch Sunday’s game.
1547	350	I’ve got to get home to my ball and chain.
1548	350	My ball and chain is mad at me.
1549	350	Tom wanted to quit his job. He said he was tired of that old ball and chain.
1550	350	Mr. Franklin always referred to his wife as his ball and chain.
1551	350	Our national debt is an economic ball and chain dragging us down, keeping longer term interest rates high.
1552	350	The business never made any money and was regarded more as a ball and chain than anything else.
1553	350	I must get home to the ball and chain!
1554	351	Molly’s been moping around all week, and I have no idea why she’s so down in the dumps.
1555	351	Rob has been down in the dumps ever since Gloria broke up with him.
1556	351	He’s been down in the dumps ever since he found out he didn’t get the job.
1557	351	Try to be sources of support for each other when one of you is feeling down in the dumps.
1558	351	I was in the dumps when I met Jayne. I was clearly not living the kind of life I should live.
1559	351	California’s economy is unlikely to stay in the dumps for more than two years.
1560	351	I’ve been feeling a bit down in the dumps since I lost my job.
1561	352	I’ll see you in the morning, love. Don’t let the bedbugs bite!
1562	352	A: "Now, you’re all tucked in and ready for dreamland. Good night, sleep tight, don’t let the bed bugs bite." B: "Night night, Daddy."
1563	352	A: "Well, sleep tight, Sis, don’t let the bedbugs bite!" B: "Mom! He’s still gloating over getting the bigger bed!"
1564	353	The candidate has been accused of using smoke and mirrors during the debate to undermine the credibility of his opponent.
1565	353	Before computer generated effects, filmmakers had to use a lot of smoke and mirrors to make fantastic, unbelievable things look realistic in their movies.
1566	353	Most people know that the politician was just using smoke and mirrors to make things look better than they really were. Her report was little more than smoke and mirrors. No one will believe any of it.
1567	353	The president claims that his economic plan is free of the smoke and mirrors of previous presidential budget proposals.
1568	353	Thousands of shareholders learned too late that the company’s image of success had been created with smoke and mirrors.
1569	353	Ministers accused the Conservatives of a "smoke and mirrors" con trick.
1570	353	He said the government had used smoke and mirrors to raise taxes.
1571	353	The commission has declared war on the smoke and mirrors of sales promotions.
1572	353	Her entire report was nothing but smoke and mirrors. Who could believe any of it?
1573	353	Your explanation is nothing but smoke and mirrors.
1574	354	A: "Hey, wanna race?" B: "No way, I’m too out of shape. You would run circles around me!"
1575	354	My sports car is going to run circles around your pokey little station wagon!
1576	354	Her presentation on the way molecules bind together was so polished and well researched—she absolutely ran circles around the other students.
1577	354	When it comes to pure processing power, Spikerosoft’s new machine runs circles around Flapple’s.
1578	354	John is a much better racer than Mary. He can run circles around her. Mary can run rings around Sally.
1579	354	Try and make a property deal with a Majorcan farmer and he’ll run circles around a Wall Street broker.
1580	354	Young companies are running circles around their older, richer, slower rivals.
1581	355	I’m going to need you to pick up the slack around the house when the baby arrives, because I’m going to literally have my hands full. 
1582	355	The fourth member of our team has been totally unreliable, so the rest of us have had to pick up the slack.
1583	356	Denise has been burning the midnight oil trying to finish this report, so she must be exhausted.
1584	356	I’ll need to burn the midnight oil to have any chance of finishing this paper before class tomorrow morning.
1585	356	If you keep burning the midnight oil like this, you’re going to end up in an early grave!
1586	356	I have a big exam tomorrow so I’ll be burning the midnight oil tonight.
1587	356	If you burn the midnight oil night after night, you’ll probably become ill.
1588	356	He’s been burning the midnight oil getting his article written.
1589	356	The truth is, I haven’t been sleeping all that much lately. Burning the midnight oil.
1590	356	Before my exams, I was burning the midnight oil every night.
1591	357	Gina is retiring next month, and she’s passing the torch to me as head of the department.
1592	357	My grandmother is unable to stand long enough to cook such a large meal, so she’s passing the torch to us to make Thanksgiving dinner this year.
1593	358	The butterflies in my stomach almost kept me from going on stage and performing.
1594	358	The butterflies in my stomach are really bad, Mom. I don’t think I can go out there and pitch.
1595	358	Even though I’m student council president, I always get butterflies in my stomach before I have to make announcements in front of the whole school.
1596	358	He seemed so full of enthusiasm that I felt foolish still having butterflies in my stomach.
1597	358	Now I can go there as a competitor, I’m starting to feel the butterflies in my stomach already.
1598	358	Any jockey who says he doesn’t get butterflies down at the start is telling lies.
1599	358	Carol felt butterflies tumbling in her guts.
1600	359	A: "No, I already told you, I do not like Tom in that way! We have nothing in common! There’s no way we would be romantically suited to one another!" B: "Hmm, the lady doth protest too much, it seems."
1601	359	A: "Shut up, I do not like Dungeons and Dragons! I’m no nerd!" B: "Haha, chill out, dude. It’s not that big a deal." C: "Seriously, the lady doth protest too much!"
1602	361	Whenever my mother-in-law visits I’m walking on eggshells in my own home.
1603	361	We’ve all been walking on eggshells around my father since he lost his job.
1604	361	When I’m at my moms house, I feel like I’m always walking on egg shells because she’s really sensitive about noise.
1605	361	We’ve been staying at my parents’ house for the past two months but it feels like we’re walking on eggs so we’re trying to move out soon.
1606	361	My roommate is so stressed out about her job that I have to walk on egg shells around the house because she’s always trying to work.
1607	361	I hate to say this but either your brother or I have to go. I feel like I’m walking on egg shells at my own house because he’s always upset about something.
1608	361	We’re all walking on eggs around the office because our manager is a complete crazy person who yells at us whenever she gets the chance.
1609	361	When I visit my parents I have to walk on eggshells so now I hardly visit them.
1610	361	Everyone is walking on eggshells at my firm because the owner is visiting our office this week.
1611	361	I used to walk on eggshells when I went to my grandparents’ house because my grandmother had terrible migraine headaches and slept a lot of the time.
1612	362	The market for paperback books has shrunk so much in recent years that our company has really just been treading water recently.
1613	362	With all the expenses we have to deal with in the new house, it feels like we’re just treading water between paychecks.
1614	363	This lifejacket will help Sally to keep her head above water in the pool.
1615	363	If credit cards are the only thing keeping your head above water, then your situation is more dire than I thought.
1616	363	I was so tired I could hardly keep my head above water.
1617	363	We have so little money that we can hardly keep our heads above water.
1618	363	It’s hard to keep your head above water on this much money.
1619	363	It’s all I can do to keep my head above water with the work I have. I can’t take on any more.
1620	363	We have so many orders that we can hardly keep our heads above water.
1621	363	Thousands of small businesses are struggling to keep their heads above water.
1622	363	I need two jobs just to keep my head above water.
1623	363	The company had great difficulty keeping its head above water during the economic crisis.
1624	363	I don’t know how she manages to keep her head above water. She has so much to do.
1625	364	Because I get paid under the table, no taxes come out of my paycheck.
1626	364	The governor is suspected of making deals under the table with corporations looking to skirt certain regulations.
1627	364	Do you remember last night at the bar at all? You were really under the table!
1628	364	Jed was under the table by midnight.
1629	364	By 3:00 in the morning, everyone was under the table.
1630	364	It was strictly an under-the-table deal.
1631	364	The mayor made a few bucks under the table, too.
1632	364	Athletes sometimes lied, or took money under the table.
1633	364	They are selling their films at the festival’s market but they’re doing it under the table.
1634	364	He was accused of making under-the-table payments.
1635	364	There will be no more under-the-table cash.
1636	364	Leaf Walker had always been a heavy drinker, he was proud of his capacity to see men half his age under the table.
1637	364	drank themselves under the table.
1638	365	With the discovery of new evidence, the tables have turned in the court case.
1639	365	When she won the lottery, the tables turned, and she was no longer struggling financially.
1640	365	Glad to hear that the tables have turned, and now fortune smiles upon you, bringing well-deserved success and happiness.
1641	365	The tables turned after the second half began, and the trailing team took the lead.
1642	365	The tables have turned, and now it’s time to start from scratch with renewed perspective and a fresh approach.
1643	365	The tables have turned in the political landscape with the surprising election results.
1644	365	Anytime soon, the tables may turn, bringing unexpected changes and opportunities that will alter the course of our lives.
1645	365	After years of dominance in the market, the tables have turned, and the tech giant is now facing stiff competition.
1646	365	No longer the butt of the joke, the tables have turned, and now you rise above with confidence and dignity.
1647	365	Once considered the devil incarnate, the tables have turned, and now redemption and forgiveness pave the way for a new chapter.
1648	366	We were all afraid we’d be getting the deep six when our boat was caught in that huge storm.
1649	366	I’m been a sailor all my life, so when my time comes, please give me the deep six out in the Pacific.
1650	366	Many Marines fought valiantly only to end up getting the deep six in this part of the ocean.
1651	366	I’m starting to fear that our key witness may have been given the deep six at the hands of the mob.
1652	366	We are all heading for the deep six eventually, so you may as well make the most of the time you’re given.
1653	366	If you tell anyone, especially the police, what you saw here today, know that the deep-six is in your future.
1654	366	The studio decided to give the film the deep six after its budget began getting out of hand.
1655	366	The president’s chief of staff got the deep six after it came to light that she had lied about her qualifications.
1656	366	After nearly 30 years of service, the fabled warship is finally getting the deep six.
1657	366	We’re going to have to deep six this whole thing if it doesn’t start coming together soon.
1658	366	The director just announced that we’re deep sixing our moonshots program.
1659	366	Management deep sixed our new department head after it came to light that she had lied about her qualifications.
1660	366	The studio decided to deep-six the film after its budget began getting out of hand.
1661	366	The president deep-sixed his chief of staff after it came to light that she had lied about her education.
1662	366	Take this horrible food out and deep-six it.
1663	366	That guy is a pain. Deep-six him so the cops will never find him.
1664	366	They deep-sixed the body of the first mate, who had died of the shakes.
1665	366	I think I’d want the deep six, but I’ll probably kick off on dry land.
1666	366	The thugs tried to deep-six the witness, but failed.
1667	366	Take this old thing out and deep-six it.
1668	366	When you know the deep six is at the end of the line no matter who you are, it makes you take life less seriously.
1669	367	You’ll be six feet under when Mom finds out that you dented her brand new car.
1670	367	The way I see it, hoarding all that money won’t do you any good once you’re six feet under.
1671	368	Looking on the bright side, I’ll have plenty of time to start my own business now that I’m unemployed.
1672	368	I know you’re disappointed, but you need to look on the bright side. At least you made it to the championship game—that’s more than a lot of people can say.
1673	368	Look on the bright side. Things could have been much worse than they are.
1674	368	I tried to look on the bright side, to be grateful that I was at least healthy.
1675	368	Look on the bright side. You still have a job.
1676	368	There is a bright side to this depressing situation, at least for one group of people: American tourists. They’re getting more for their dollar right now.
1677	368	I know it’s inconvenient to be without a car, but look on the bright side—at least you’ll save money on petrol.
1678	369	The politician’s campaign is trying to cast a wide net ahead of the election to bring in voters from lots of different demographics.
1679	369	Specialized, targeted marketing can be very effective for the right kinds of products, but most of the time you want to cast a wide net when you advertise to consumers.
1680	369	I don’t feel the need to cast a wide net with my business. I’m very happy in my small town, baking for my loyal customers.
1681	370	I don’t need every detail of the event—just tell me about it in broad brush strokes. 
1682	370	Describe your idea in broad strokes, just so I can get a sense of it.
1683	370	No broad brush strokes—I want to hear absolutely everything about your trip to Tahiti!
1684	371	That meeting really gave me food for thought—I might invest in their company after all.
1685	371	That’s some interesting food for thought. I hadn’t considered that angle before.
1686	371	I always get food for thought out of these debates, even if I don’t agree with most candidates’ positions.
1687	371	Your essay has provided me with some interesting food for thought.
1688	371	My adviser gave me some food for thought about job opportunities.
1689	371	This Italian trip gave us all much food for thought.
1690	371	It was poor Alan dying like that, gave me food for thought.
1691	371	The lectures were very interesting and gave much food for thought.
1692	372	My ex-husband was such a penny pincher that, on the rare occasion we would go out to eat, he wouldn’t even leave a tip!
1693	372	It was when I was completely broke in college that I became something of a penny pincher.
1694	373	We need to draft this player—he’s definitely the cream of the crop.
1695	373	These delicious strawberries are the cream of the crop.
1696	373	This particular car is the cream of the crop.
1697	373	These three students are very bright. They are the cream of the crop in their class.
1698	374	With so many manuscripts arriving daily, it’s a challenge to separate the wheat from the chaff and spot the really exceptional ones.
1699	374	When it comes to books, time will separate the wheat from the chaff. Good books will have lasting appeal, and the rest will be forgotten. The managers hoped that the new procedure for evaluating employees would separate the wheat from the chaff.
1700	374	The first two rounds of the contest separate the wheat from the chaff.
1701	374	Judges should not forget that when you separate the wheat from the chaff, you should try to keep the wheat.
1702	374	It’s up to Wilkinson to sort out the wheat from the chaff and get the team back to the top of the table.
1703	374	There’s so little wheat in all this chaff.
1704	374	Was there rather less grain than chaff?
1705	374	When all the applications came in, our first task was to separate the wheat from the chaff.
1706	375	You’ve been acting crazy lately, can you please try an reel it in
1707	376	I can always rely on Jake to help me—he’s been my right-hand man for years now.
1708	376	He was always by her side and supported her in everything she did. He was her right-hand man and he traveled with her everywhere.
1709	376	You’d be Oliver’s right-hand woman. He needs somebody he can really rely on, don’t you, Oliver?
1710	376	Ricard was her husband’s right-hand person and took an active part in the broadcasting business and all other ventures he was involved in.
1711	376	I’d like to introduce you to Peter Davies, my right-hand man. He’ll help you when I am away.
1712	377	Look, I know you’re very proud man, but you need to let other people help you if you’re in trouble. No man is an island, Dan.
1713	377	It’s when our communities rally around us in times of tragedy that we truly appreciate that no man is an island, entire of itself.
1714	378	I never forgot the way he bullied and humiliated me in high school, but I chose to bide my time. Ten years later, my global corporation bought his family’s puny company and exploited it for everything it was worth, leaving him penniless. It’s true what they say—revenge is a dish best served cold.
1715	378	I don’t mind waiting to get revenge on Greg; I’ll wait ten years if I have to. Revenge is a dish best served cold.
1716	380	Your students clearly don’t respect you. I know you don’t want to yell at them, but you’ve got to break eggs to make an omelet.
1717	380	If I don’t cut people’s salaries, the company is going to go bankrupt. It’s unfortunate, but you’ve got to break eggs to make an omelet.
1718	381	Don’t interrupt the suspect with questions, just let him keep talking. Give him enough rope to hang himself!
1719	381	Look, you don’t have to do anything to undermine Bill, just give that fool enough rope to hang himself!
1720	381	Tom keeps bullying me to see if he can get a reaction. So today, I just let him carry on until I knew the boss could hear us, and Tom got fired for it. It’s true what they say—just give him enough rope to hang himself.
1721	382	Can Jeff’s employee review wait until next week? His girlfriend just left him, and I don’t want to kick him while he’s down. 
1722	382	A: "I’m sorry you got fired, but you shouldn’t have been so sloppy with your work." B: "Wow, way to kick me when I’m down."
1723	383	All of my friends have tied the knot and started having kids.
1724	383	John and Mary are tying the knot this summer in France.
1725	383	I tied with Joel for first place. I tied for the trophy with Joel.
1726	383	We tied the knot in a little chapel on the Arkansas border. They finally tied the knot.
1727	383	It was hard to find somebody to tie the knot at that hour. It only took a few minutes for the ship’s captain to tie the knot.
1728	383	The couple tied the knot last year after a 13-year romance.
1729	383	Len tied the knot with Kate five years ago.
1730	383	When did you two decide to tie the knot?
1731	383	We tied the knot in a little chapel on the Arkansas border.
1732	383	It was hard to find somebody to tie the knot at that hour.
1733	384	I’m just about ready to move to Europe, but I need to tie up some loose ends with my ex-girlfriend before I go.
1734	384	The legal team is still tying up a few loose ends in the merger contract, but, other than that, we are ready to move ahead with the deal.
1735	384	The series finale deftly ties up all the loose ends that had been left hanging over the course of the show’s six-season run.
1736	385	A: "We don’t really need to implement these ridiculous changes, do we? Our current method is working just fine." B: "Right. If it ain’t broke, don’t fix it."
1737	385	Why do you have your tools out? Come on, man, the washing machine’s fine, and if it ain’t broke, then please don’t fix it!
1738	385	With regard to proposals for some grand reorganization of the intelligence community: If it ain’t broke, don’t fix it. And I believe it is not broke.
1739	385	Her outlook is "If it isn’t broken, why fix it?" She puts up with a lot I wouldn’t tolerate.
1740	385	Why do they keep suggesting "improvements" when everything’s working perfectly? If it ain’t broke, don’t fix it.
1741	385	It’s fine. Leave it alone. If it ain’t broke, don’t fix it!
1742	386	Are you two talking about me? My ears are burning.
1743	386	No wonder your ears are burning—Mom and I were just talking about you and your new job.
1744	386	A: "Well, my ears are burning now. Why are you guys so quiet all of a sudden?" B: "Oh, no reason."
1745	386	Jenny’s ears must have been burning last night: we talked about her for hours.
1746	387	Well, they invited you, so the ball is in your court now. Do you want to go out with them or not?
1747	387	We’ve made him an offer but now he has to decide whether to accept: the ball is in his court.
1748	387	I’ve given them a list of the changes that I think are necessary, so the ball’s in their court now.
1749	388	Peter only comes out for a drink once in blue moon now that he has kids.
1750	388	A: "Do you ever eat pork?" B: "Only once in a blue moon. I prefer beef."
1751	388	Jill: Does your husband ever bring you flowers? Ellen: Once in a blue moon.
1752	388	Once in a blue moon, I buy a fashion magazine, just to see what people are wearing.
1753	388	I only get over to Cambridge once in a blue moon and I’m never in London.
1754	388	Only once in a blue moon do properties of this quality become available.
1755	388	Sue’s daughter only visits her once in a blue moon.
1756	388	Once in a blue moon I have a little wine with dinner.
1757	389	I have a broken foot, but once I get my cast off, the doctor says I’ll be as right as rain.
1758	389	The project would be right as rain if we could just get the servers to stay online.
1759	389	A: "The repairman came this morning and worked on the vending machine. He says it’s right as rain now." B: "Yeah, I’m not so sure. It just took my dollar and didn’t give me my candy!"
1760	389	She was right as rain about the score.
1761	390	I had a professor in college whose bark was much worse than his bite; he held everyone accountable but allowed everyone to reach their full potential with guided help.
1762	390	Don’t worry about my neighbor; she likes to form an opinion about everything that is not her business, but her bark is worse than her bite, and you should just ignore her.
1763	390	Growing up, my dad’s bark was worse than his bite, although he was known to meet punishments for serious transgressions.
1764	391	We’re not looking for major innovations. Just take the path of least resistance so we can get the product finished on time.
1765	391	You’re never going to be respected by your boss if you choose the path of least resistance every time he asks you to do something you don’t want to do.
1766	391	John will follow the path of least resistance. I like challenges. I won’t usually take the path of least resistance.
1767	392	Having two kids under age five sure keeps me on my toes!
1768	392	She kept us on our toes right from the moment she took command.
1769	392	His lively campaign has kept opposition parties on their toes for months.
1770	392	It’s always good to have a little bit of change in your job, because it keeps you on your toes, doesn’t it?
1771	392	Regular surprise visits help to keep the staff on their toes.
1772	392	This job really keeps me on my toes.
1773	394	Boy, am I in a pickle—I accidentally made plans to meet with two different clients today.
1774	394	We’re in a pretty pickle now because the hotel gave our room away.
1775	394	Boy, am I in a pretty pickle—I accidentally made plans to meet with two different clients today.
1776	394	Boy, am I in a right pickle—I accidentally made plans to meet with two different clients today.
1777	394	We’re in a right pickle now because the hotel gave our room away.
1778	394	John has gotten himself into a pickle. He has two dates for the party.
1779	394	Now we are in a pretty pickle. We are out of gas.
1780	394	Things are in a real pickle at the moment, I’m afraid. My assistant’s left and I’m completely lost without him!
1781	394	Can you help me? I’m in a bit of a pickle.
1782	395	The senator was long accused of insider trading, and he was finally caught with his hand in the cookie jar when his conversation with a Wall Street executive was leaked to the media.
1783	395	Their CEO is so slick that I doubt he’ll ever be caught with his hand in the cookie jar.
1784	395	I can’t believe you bribed that intern. What are you gonna do if you’re caught with your hand in the cookie jar?
1785	396	A: "Our annual budget is still too high. Surely you can trim the fat a bit more." B: "Sir, there’s no more fat to trim—if we cut the budget any further, we won’t be able to operate properly."
1786	396	Your story is good and your writing is solid, but you need to trim the fat a bit. There are just so many characters and plot points that aren’t meaningful.
1787	397	Various party honchos insist that taking health insurance away from 20 million Americans will be like taking candy from a baby, because the babies don’t like the candy.
1788	397	Parenthetically, our campaign to turn college millennials against capitalism, free speech, Fox News, and their parents’ values is meeting with spectacular success—although I must admit it is a bit like taking candy from a baby, so to speak.
1789	397	Morrison said she told Aramark food service director Monique Herard that the situation wasn’t right, and that "it’s like taking candy from a baby."
1790	398	I can’t judge your story in its current state—you need to flesh it out more and then resubmit it.
1791	398	Look, I’m not committing to anything until you flesh out this plan more.
1792	398	Have you two fleshed out the uniform rules for this school year yet?
1793	399	My term paper isn’t due until next week, but I want to get ahead of the game and finish it tonight.
1794	399	For once, we got ahead of the game and hung our Christmas decorations up right after Thanksgiving.
1795	399	You have all these boxes of files to go through before the merger, and I suggest you start now, to get ahead of the game.
1796	399	It’s hard to get ahead of the game in network security when the landscape of cyber threats is constantly changing.
1797	399	She’s just an intern—how would she get ahead of the game with trade information?
1798	399	A: "When you’re an admin in the C-suite, you hear a lot of things that allow you to get ahead of the game." B: "OK, so are layoffs coming or not?"
1799	400	Sure, you need strong leadership for a project like this to take shape, but it’s the people down in the trenches putting everything into practice who make it all work.
1800	400	I spent nearly five years working in the trenches dealing directly with customers and suppliers, so when an opportunity in upper management came up, I was more than happy to take it.
1801	400	How can you begrudge us a raise when we’re the ones down in the trenches, making all of your products in the factory?
1802	401	A: "Should we reach out to our distributors and let them know there may be a problem down the line?" B: "No, let’s just cross that bridge when we get there."
1803	401	The job interview is a week away, so I’m not worried about it yet—I’ll cross that bridge when I come to it.
1804	401	A: "Should we reach out to our distributors and let them know there may be a problem down the line?" B: "No, let’s just cross that bridge when we come to it."
1805	401	Alan: Where will we stop tonight? Jane: At the next town. Alan: What if all the hotels are full? Jane: Let’s cross that bridge when we come to it.
1806	401	"You can’t make me talk to you." — "No, but the police can." — "I’ll cross that bridge when I come to it."
1807	401	We have not crossed that bridge yet. We are trying to get the criminal case dealt with.
1808	401	There are still a few bridges to cross.
1809	401	As to what would happen to the case for non-proliferation when the Cold War was won, the allies would cross that bridge when they came to it, which seemed at the time well beyond any foreseeable future.
1810	401	"What will you do if you can’t afford to run your car next year?" "I’ll cross that bridge when I come to it."
1811	402	I’ve learned never to take corporate PR statements at face value.
1812	402	It’s hard to take Jeff at face value when he’s been caught lying in the past.
1813	403	From now on, I plan to toe the line and do exactly what Gram tells me, to avoid getting in any more trouble.
1814	403	I expect you to toe the line at all times if you want to remain at this firm, Jonathan.
1815	403	The new legislation could force them out of business if they don’t toe the line.
1816	403	Journalists who refuse to toe the line will have to be sacked.
1817	403	He was sacked for not toeing the Party line.
1818	403	An insider suggests that the said minister is on the skids. The minister smarts, and toes the line.
1819	403	The Prime Minister is angry because some members of the government are not toeing the line.
1820	404	I don’t mind my roommate being a bit messy, but leaving dirty dishes for me to clean up is where I draw a line in the sand!
1821	404	I’m willing to accept some minor edits on my script, but I draw a line in the sand at any major rewrites.
1822	404	Aunt Peggy was fine with us setting her up on a date, but she drew a line in the sand at online dating.
1823	404	Todd drew a line in the sand by giving his roommate an ultimatum about his sloppiness—he had to start cleaning up after himself or move out.
1824	404	The government is trying to draw a line in the sand regarding public sector pay rises.
1825	406	A: "There’s no way it’s possible to jump from the roof into the pool. It’s 20 feet away!" B: "Hold my beer, amateur."
1826	406	Wow that was a terrible game. It was like the one team saw the other team making dumb plays and was like, "Hold my beer."
1827	408	You have to stay calm during business negotiations or else you may end up getting the short end of the stick.
1828	408	I feel like I got the short end of the stick on this project, with the amount of extra time and effort I’ll have to put into it.
1829	408	Why do I always get the short end of the stick? I want my fair share! She’s unhappy because she has the short end of the stick again.
1830	409	We’ve all moved on from that problem, so there’s no use beating a dead horse.
1831	409	I’m sorry if I’m beating a dead horse, but I just can’t let this issue go.
1832	409	OK, Tom, you’ve made your point. Now you’re just beating a dead horse.
1833	411	Did you hear that Daria’s best friend stole money from her bank account? What a snake in the grass.
1834	411	How could I ever have trusted that snake in the grass? John is such a snake in the grass.
1835	411	He’s a snake in the grass—a guy you really can’t trust.
1836	411	We used to be friends, but who knew he’d turn out to be such a snake in the grass?
1837	411	How could I ever have trusted that snake in the grass?
1838	412	Sooner or later, that company will go bankrupt if they keep sitting on their laurels.
1839	412	It’s time for you to start working again. You’ve rested on your laurels for too long.
1840	412	If you rest on your laurels, you will fall behind others.
1841	413	When the wife is kept barefooted and pregnant there are no divorces.
1842	414	A good rule of thumb is to plant your seedlings around the end of May.
1843	414	As a rule of thumb, I move my houseplants outside in May. Going by a rule of thumb, we stop for gas every 200 miles when we are traveling.
1844	414	As a rule of thumb, drink a glass of water or pure fruit juice every hour you are traveling.
1845	414	A good rule of thumb for any type of studio photography is to use no more light sources than are strictly necessary.
1846	414	The best forecast of tomorrow’s weather in any one place often comes not from a supercomputer, but from the rule of thumb that says: tomorrow it will be similar to today.
1847	414	As a rule of thumb you need a litre of paint to every 12 square metres of wall.
1848	415	Your description rings a bell, but I don’t think I’ve ever been there myself.
1849	415	A: "Have you ever heard of Steve Robinson?" B: "Hmm, the name doesn’t ring a bell."
1850	415	I’ve never met John Franklin, but his name rings a bell. Whenever I see a bee, it rings a bell. I remember when I was stung by one.
1851	415	The name rings a bell but I can’t think where I’ve heard it.
1852	415	"I’ll check and see if we’ve anything on him," said the sergeant. "It doesn’t ring a bell at the moment."
1853	415	That name rings a bell but I can’t remember exactly where I’ve heard it before.
1854	415	Yes, that rings a bell. I seem to remember it.
1855	416	I really don’t know how to operate this thing, I’m just flying by the seat of my pants here.
1856	416	You can’t just fly by the seat of your pants, Jenna—please give your future some serious thought.
1857	416	I know my parents think that I’m just flying by the seat of my pants ever since I dropped out of college, but I just signed with a record label and am launching my singing career!
1858	416	"In the first year of trading we knew nothing and were flying by the seat of our pants," Petti said.
2032	453	I have to work at two jobs to make ends meet.
1859	416	The truth is that all new parents fly by the seat of their pants and try to learn quickly from experience.
1860	416	It had always been a seat-of-the-pants type of organization.
1861	417	Sure, go ahead, bet all your money at the track and go home penniless, like you always do. Play stupid games, win stupid prizes.
1862	417	If you keep bullying people like that, you’ll eventually get a punch in the face. Play stupid games, win stupid prizes.
1863	418	Her predictions about the company’s collapse were right on the nose.
1864	418	True to his word, the detective arrived at 1:38 PM on the nose.
1865	418	They had Bob Dylan’s song "The Times They Are A-Changin’" playing over a montage of important moments in human history. It was all a bit on the nose, if you ask me.
1866	418	This is Radio One FM. Precisely on the nose seven sixteen.
1867	418	It is now the Liberals who are on the nose at a state level.
1868	418	The budget should hit the $136 billion target on the nose.
1869	418	All three of them were at the appointed place right on the nose.
1870	418	predicted the final score on the nose.
1871	419	Here’s the hammer—now go hit the nail on the head.
1872	419	You really hit the nail on the head with that answer—good job.
1873	419	A: "We would probably see an increase in sales if we expanded our marketing efforts in these three regions." B: "I think you’ve hit the nail right on the head, Catherine!"
1874	419	If you expect to drive a nail straight, you have to hit the nail on the head.
1875	419	You’ve spotted the flaw, Sally. You hit the nail on the head.
1876	419	Bob doesn’t say much, but every now and then he hits the nail right on the head.
1877	419	Duncan Smith hit the nail on the head when he said that the Prime Minister promised so much and yet changed so little.
1878	419	I agree with Dr Carey in everything he says. I think he’s hit the nail right on the head.
1879	419	"It sounds as if he almost depended on you as much as you depended on him." — "You just hit it on the nail."
1880	419	Yet his conceit and knack of hitting nails on heads meant that even his best performances made him as many enemies as friends.
1881	419	"So you want to move to another department." "You’ve hit the nail on the head. That’s exactly what I want."
1882	420	If they invent a hoverboard before I kick the bucket, I’m definitely going to try it, no matter how old I am.
1883	420	Any plant under my care kicks the bucket in about a week.
1884	420	I had this truck for nearly 30 years before it finally kicked the bucket.
1885	420	Is the printer jammed again, or has it kicked the bucket this time?
1886	420	The doctor said the old girl is about to kick the bucket—got some sort of kidney infection.
1887	420	All the money goes to her when the old man kicks the bucket.
1888	420	He got married for the first time when he was 75 and a week later he kicked the bucket.
1889	420	I’m too young to kick the bucket!
1890	421	This sounds like a pretty amazing deal they’re offering. If I were you, I’d strike while the iron is hot.
1891	421	I deliberated too long before accepting the job offer, and now they’ve given it to someone else. I should have struck while the iron was hot.
1892	421	This is the best time in the last ten years to buy a house. Strike while the iron is hot. Ask Lisa for a favor now, while she’s in a good mood. Strike while the iron is hot.
1893	421	This is the week to get plans off the ground. It’s time to strike while the iron is hot.
1894	421	In order to get the recognition, you have to strike while the iron is hot.
1895	421	He seems in a good mood. Why don’t you strike while the iron is hot and ask him now?
1896	422	We might get brunch next weekend, but nothing is set in stone yet.
1897	422	Keep in mind that these blueprints are not set in stone—they’re just to give you a feel for the design.
1898	422	The exact terms of the scheme have yet to be set in stone.
1899	422	These are just preliminary ideas and nothing is set in stone.
1900	422	These ideas are up for discussion—they are not cast in stone.
1901	424	In solving the mystery, the detective had to carefully follow the trail of breadcrumbs left by witnesses and evidence.
1902	424	During the software debugging process, the programmer followed the trail of breadcrumbs in the code to identify and fix the source of the error.
1903	424	Teachers often follow the trail of breadcrumbs in student assessments to understand learning gaps and tailor their teaching methods accordingly.
1904	424	Researchers meticulously followed the trail of breadcrumbs in the data, uncovering subtle patterns that led to a breakthrough in their study.
1905	424	The project team needed to follow the trail of breadcrumbs in the project plan to identify potential delays and make necessary adjustments.
1906	424	Healthcare professionals follow the trail of breadcrumbs in patients’ records to track medical histories and provide more personalized care.
1907	424	Entrepreneurs navigate the complexities of the market by following the trail of breadcrumbs in consumer behavior and industry trends. 
1908	424	The detective carefully follows the trail of breadcrumbs in the witness statements and surveillance footage to solve the complex case.
1909	424	In navigating the intricate financial landscape, the investment analyst follows the trail of breadcrumbs left by market indicators and economic forecasts.
1910	424	To understand the evolution of the species, the evolutionary biologist follows the trail of breadcrumbs found in fossil records and genetic data.
1911	425	After the loss, their chances of getting into the championships are hanging on by a thread.
1912	425	Her life hung on by a thread as medics rushed her to the hospital.
1913	425	I’m warning you, Davis, you’re hanging on by a thread! One more slip up, and you’re fired!
1914	426	I’ve never had a green thumb—everything I try to grow dies!
1915	426	With John’s amazing green thumb, our garden always looks fantastic!
1916	426	My mom can keep any plant alive, even ones that I’ve nearly killed—she really has a green thumb.
1917	427	I’m sorry to split hairs, but your portion of the bill is $25.97, not $25.79.
2033	453	Through better budgeting, I am learning to make both ends meet.
1918	427	I actually think it was your responsibility, not Dave’s, but let’s not split hairs about it.
1919	427	They don’t have any serious differences. They are just splitting hairs. Don’t waste time splitting hairs. Accept it the way it is.
1920	427	More than half the cases they complained about were not, in fact, on Garzon’s list, but let’s not split hairs.
1921	427	Don’t split hairs. You know what I’m getting at.
1922	427	We were becoming impatient with hair-splitting over legal technicalities.
1923	427	You might think I’m just splitting hairs, but what exactly do you mean by "a significant improvement"?
1924	428	Camels have been used by people as beasts of burden for thousands of years because of their size, strength, and ability to travel long distances with minimal need for food and water.
1925	428	Just be glad you live in the modern age and can transport all this stuff via truck, rather than relying on an ox or other beast of burden.
1926	428	I’ve gotta go—it seems my toddler is using our dog as a beast of burden to pull her wagonful of toys.
1927	429	He says he’s my friend, but then he totally hung me out to dry in that meeting! Not one word of support as the boss tore into me!
1928	429	We really hung our goalie out to dry—that’s how the other team was able to score five goals in the first 10 minutes.
1929	429	You said you’d help me put the kids’ toys together, but then you hung me out to dry on Christmas Eve! I had to do everything by myself—where were you?
1930	429	The boss was really angry at Billie. He yelled at him and hung him out to dry.
1931	429	We point out that another MP has been hung out to dry for failing to declare what was (relative to this) a minuscule interest.
1932	429	It was his own party who hung him out to dry for losing the election.
1933	430	It sounds like Betsy doesn’t have a pot to piss in. So what makes you think she’s going to loan you money?
1934	430	Dude, back then I didn’t have a pot to piss in or a window to throw it out of, but I managed to get by somehow.
1935	430	My parents always act like I don’t have a pot to piss in, even though I have a stable, lucrative job and don’t need them to give me money.
1936	431	Unfortunately the entire study was just retracted by the medical journal, and now my thesis is left without a leg to stand on.
1937	431	Without a leg to stand on following his opponent’s thorough debunking of his claims, the candidate resorted to name-calling and empty rhetoric for the remainder of the debate.
1938	431	I know I’m without a leg to stand on here, given what I’ve done in the past, but it still upsets me what happened!
1939	432	I really painted myself into a corner by leaving this essay till the last minute!
1940	432	The candidate painted himself into a corner during the debate, having to take back several things he’d already said.
1941	432	The Government has painted itself into a corner on the issue of equalizing the State pension age.
1942	432	You’ve boxed yourself into a corner, haven’t you? You have no one to blame but yourself.
1943	432	You’ll fight to the death when you’re boxed into a corner unless you’re provided with a reasonable way out.
1944	432	The President had backed himself into a corner by promising not to raise taxes.
1945	433	The country’s prime minister has gained a reputation for shooting from the hip, issuing executive orders without consulting members of parliament.
1946	433	The boss tends to shoot from the hip, so don’t take what he says too personally.
1947	433	When I lived at home on the farm, my father taught me to shoot from the hip. I quickly shot the snake before it bit my horse. I’m glad I learned to shoot from the hip.
1948	433	John has a tendency to shoot from the hip, but he generally speaks the truth. Don’t pay any attention to John. He means no harm. It’s just his nature to shoot from the hip.
1949	433	They criticized his readiness to shoot from the hip.
1950	433	She claimed that she did not shoot from the hip. She liked to think hard and long before taking decisions.
1951	433	He certainly has a tendency to fire from the hip—to be impulsive.
1952	433	As a manager, he was sometimes accused of shooting from the hip, but he was always popular with his colleagues.
1953	433	She has a tendency to shoot from the hip, but that’s not really a problem.
1954	434	It’s clear, however, that the political implications of this issue are well outside the author’s wheelhouse.
1955	434	Jeff generally doesn’t date women outside of his wheelhouse.
1956	434	You need to get out of your wheelhouse and live on the wild side for a change!
1957	435	All these questions you’re asking are above your pay grade.
1958	435	He had some great ideas about how to run the company, but contributing such things was above his pay grade.
1959	435	I would love to sign off on those documents for you, Jim, but that’s above my pay grade.
1960	435	He soon realized that the details of the IT development project were a bit above his pay grade.
1961	435	Sorry, fishing garbage out of the lake is above my pay grade.
1962	435	Al’s a great handyman but electrical work is above his pay grade.
1963	436	There’s an enemy sniper on the roof. Make sure you aren’t caught in his cross hairs. In these parts, an animal that’s caught in the crosshairs is as good as dead.
1964	436	As soon as he realized he was caught in the thug’s crosshairs, it was already too late.
1965	436	The CEO has been caught in the crosshairs of numerous politicians and pundits for his recent comments on immigration.
1966	436	The boss is really angry about what happened, so just keep your head down during the meeting. You don’t want to be caught in his crosshairs.
1967	436	I have no idea what they were arguing about, I just walked in at an inopportune time and was caught in the crosshairs.
1968	437	I just know that each game I have to prove why I’m No. 1, because I have a target on my back
1969	437	I don’t like to think about favorites but I knew a lot of people had me as the favorite so there was a target on my back
1970	437	Councilor Steven Camara is out, having had a target on his back ever since he was the lone vote against the measure to remove Correia from office and then was heard pouring his heart out to defend the mayor.
2034	453	Many people are struggling to make ends meet because wages are failing to keep pace with rising prices.
1971	438	I’m sorry, but we can’t travel with your brother any longer. The sheriff has put a price on his head and it’s too dangerous for the rest of us!
1972	438	I’ll never be able to live peacefully in this town as long as I have a price on my head.
1973	438	Of course I’ve gone into hiding—the authorities put a price on my head! What else can I do?
1974	440	You want me to tell our plans to Jill? I don’t trust Jill as far as I can throw her.
1975	440	The government is asking us to believe that they’ll apply the new tax fairly, but I wouldn’t trust them as far as I can throw them.
1976	441	You can’t live life completely reserved, you know. You’ve got to throw caution to the wind every now and then.
1977	441	After my father won a bit of money at the race tracks, he began throwing caution to the winds and gambling everything we had there.
1978	441	Jane, who is usually cautious, threw caution to the wind and went swimming in the ocean. I don’t mind taking a little chance now and then, but I’m not the type of person who throws caution to the wind.
1979	441	Perhaps I should throw caution to the wind, give up my job and just go traveling.
1980	441	This was no time to think, he decided. He threw caution to the winds and rang the bell of the ground-floor flat.
1981	441	I decided to throw caution to the winds and buy myself a really expensive pair of shoes.
1982	441	He threw caution to the wind and dived in after the child.
1983	442	Whoa, hold your horses, kids. We’re going to sing before we start eating cake.
1984	442	I know you’re excited to see the prototype, but you all just need to hold your horses while we get set up.
1985	442	Tom: Let’s go! Let’s go! Mary: Hold your horses.
1986	442	Hold your tater, now. Where did you say you are going?
1987	442	Hold your horses a minute, will you, and just take another look at this document.
1988	442	Hold your horses! We haven’t finished the last question yet.
1989	442	Now, just hold your horses and let me explain.
1990	443	Make sure you have researched your position thoroughly and comprehensively before the debate. You don’t want to bring a knife to a gunfight.
1991	443	If you haven’t studied law, representing yourself in court is like bringing a knife to a gunfight.
1992	443	That skinny twerp is bringing a knife to a gunfight if he thinks he can best me, two-time champ, on the wrestling mat.
1993	444	No one on the board of directors was willing to compromise their position on the issue, and with each of us having veto power, it looked like we were heading into a Mexican standoff.
1994	445	The bosses have been impressed with your work so far. If you keep playing your cards right, you could see a promotion inside of a year.
1995	445	I’m really hoping Janet will agree to go on a second date, but I’ll have to play my cards right tonight!
1996	445	Soon, if she played her cards right, she would be head of the London office.
1997	445	He was convinced he could actually win the election provided that he played his cards right.
1998	445	If you play your cards right you could get promotion in a year or two.
1999	446	We’re all curious about what the boss has been discussing in those meetings with the lawyers, but she’s playing her cards close to her chest.
2000	446	Sorry for not being more straightforward about my plans, but I’m playing my cards close to my chest for the time being.
2001	447	My stamina is the ace up my sleeve for this race—the other runners don’t stand a chance!
2002	447	The defense attorney waited for just the right time to play the ace up her sleeve—a new eye-witness.
2003	447	She’s keeping all the details of their unscrupulous business practices as an ace in her sleeve should they ever try to fire her.
2004	449	I think it’s so sweet how Jenny holds Tim’s hand when they walk into school.
2005	449	I know you’re worried about giving your speech, but I’ll be there to hold your hand.
2006	449	Thank you, but I can figure these problems out myself without you holding my hand.
2007	449	The video game is brutally difficult, and it doesn’t hold the player’s hand at any point.
2008	449	Please hold Jimmy’s hand when you cross the street.
2009	449	You’ll be all right, won’t you? You don’t need anyone to hold your hand, do you?
2010	449	Tony will hold your hand through the sale, deal with offers and advise on particulars.
2011	449	I’ll support him up to a point but I can’t hold his hand forever.
2012	449	If you expect lots of hand-holding because you’re just starting out as an investor, you’re probably better off paying a flat fee.
2013	450	I was shocked that they reached an agreement at the eleventh hour after weeks of squabbling.
2014	450	I was shocked that they reached an eleventh-hour decision after weeks of squabbling.
2015	450	Our pianist had fallen ill, and then, at the eleventh hour, when we thought we’d have to cancel the performance, Jill offered to replace him.
2016	450	an eleventh-hour decision
2017	451	LeBron James has truly been a class act in basketball long before he entered the NBA.
2018	451	Teresa received a well-deserved promotion after exhibiting class act knowledge of the industry.
2019	451	The film drama show hailed as a class act failed to become a great hit.
2020	451	(Sarcasm) “The new guy is a real class act. We’ll see how long he can keep it up.”
2021	452	Driving is for the birds when you live in a big city—unless you like sitting in traffic!
2022	452	I miss my usual shift—night work is for the birds.
2023	452	Man, this is for the birds. I’ve been waiting for an hour already, where is she?
2024	452	This television program is for the birds.
2025	452	Winter weather is for the birds.
2026	452	This journal business is for the birds. It’s a waste of time.
2027	452	This idea that everybody can go to college and pay it off by public service is for the birds.
2028	452	Fishing? That’s strictly for the birds, if you ask me.
2029	452	I don’t like this kind of life. It’s for the birds.
2030	453	To make ends meet, Phil picked up a second job delivering pizzas.
2031	453	After the large income tax hike, many people suddenly found it difficult to make both ends meet.
2035	453	He has trouble making ends meet because he can’t find work and his government check is barely enough to cover the rent.
2036	453	Actually I think she’s having trouble making ends meet, now that she’s retired.
2037	453	Since I lost my job, I’m finding it harder to make ends meet.
2038	454	My father was always very closed off regarding his feelings, so when I had kids, I made a point of wearing my heart on my sleeve with them.
2039	454	The senator has begun wearing his heart on his sleeve now that he’s not seeking re-election.
2040	454	She’s one of these people who wears her heart on her sleeve.
2041	454	She simply doesn’t wear her heart on her sleeve so it’s sometimes difficult to know what she’s feeling.
2042	454	You would have thought the heart-on-the-sleeve atmosphere would have suited his nature.
2043	454	He is not suffering from compassion fatigue, yet neither does he wear his heart on his sleeve.
2044	454	He wears his heart on his sleeve and often gets hurt.
2045	455	The deal was finally in the bag after a few rounds of tough negotiations.
2046	455	The game was in the bag when the team scored their third goal.
2047	455	After months of intense campaigning, the politician believed that elections were in the bag.
2048	455	I have not yet gotten the job, but I believe it’s pretty much in the bag.
2049	455	Everyone thought that he had the match in the bag, but his opponent suddenly put in a tremendous performance and snatched it away from him.
2050	455	Having received a lot of praise from the management, he knew that his promotion was in the bag.
2051	455	Though I feel the contract is in the bag, I’ll wait for confirmation before telling anyone.
2052	456	It’s no wonder those children got into the trouble they did; idle hands are the devil’s tools, and they were in need of structure and direction.
2053	456	The politicians lazing about led to a delay in House votes, proving the adage that idle hands are the devil’s playground.
2054	456	The cancellation of the after-school programming was a direct reason for the rise in student mischief in the community, as idle minds are the tools of the devil.
2055	458	He needs to slow his roll because there’s no way he’s getting a deal on this house at that lowball price.
2056	458	Slow your roll, will ya? This really isn’t a big deal.
2057	458	Whoa, you need to slow your roll before you start a barroom brawl!
2058	458	A: "Who are you calling ugly, pal?" B: "Hey, I wasn’t even talking to you! Slow your roll!"
2059	459	We’ll definitely be able to get a table at that restaurant, it’s really off the beaten path.
2060	459	I chose that island as a vacation spot because I knew it was off the beaten path and would give me some much-needed solitude.
2061	459	I tend not to stray off the beaten path when it comes to books. I don’t like stuff that’s too experimental or academic.
2062	459	None of us were surprised when James decided to study yoga in India instead of going to college. He has always kept off the beaten path in life.
2063	460	Ha! Read ’em and weep—a royal flush! I win!
2064	460	A: "There’s no way that you got cast in the lead role—my audition was way better than yours!" B: "Read ’em and weep, there’s my name right at the top of the list!"
2065	461	I’m sorry, I would love to approve your application, but my hands are tied by the regulations.
2066	461	The company stated that they have tried everything in their power to avoid pay cuts, but their hands are tied at this point.
2067	461	Believe me, we tried everything to keep that conglomerate from demolishing the old library. Our hands are tied now.
2068	461	I’m sorry. There’s nothing I can do. My hands are tied.
2069	461	He would like to help but his hands are tied by regulations approved by the council of ministers.
2070	461	The present rule ties jockeys’ hands and I don’t feel it is fair.
2071	461	She felt frustrated by it all. "We feel as though our hands have been tied because we have no power at all."
2072	462	I’m a professional musician, so that song is hardly a challenge—I could play it with one hand tied behind my back!
2073	462	Are you kidding? Montgomery is a powerhouse boxer. He’d knock that kid out with both hands tied behind his back!
2074	464	I hate arguing with that type of person. As soon as you start wearing down their logic, they just move the goalposts on the whole thing!
2075	464	We’re never going to get the book design finished in time if the publisher keeps moving the goalposts every couple of months like this!
2076	464	Claiming victory after cutting the tax by a small fraction when in fact you had said you’d abolish it altogether is really moving the goalposts, isn’t it?
2077	464	He was always moving the goalposts so that we could never anticipate what he wanted.
2078	464	They seem to move the goalposts every time I meet the required conditions.
2079	464	The administration is shifting the goalposts and changing its demands.
2080	464	Many companies have, in recent years, moved the goalposts so that those who used to qualify no longer do so.
2081	464	Our union is angry at the management for moving the goalposts during the pay talks. Every time agreement is reached they put up another obstacle.
2082	465	I felt like someone had pulled the rug out from under me when my health insurance said it was going to stop paying for my medical bills.
2083	465	I’d love to quit my job, but I just can’t pull the rug from under my team like that.
2084	465	Don pulled the rug out from under me in my deal with Bill Franklin.
2085	465	I was close to getting the contract until Don came along and pulled out the rug.
2086	466	All roads lead to Rome, so you can approach the puzzle any way you like, as long as you solve it.
2087	466	You both came up with very creative methods to complete this experiment. See, Class, all roads lead to Rome.
2088	466	I don’t see how he’s going to talk his way out of this one—there’s security footage of him shoplifting, and they found the stolen goods on him. All roads to lead to Rome.
2089	466	Mary was criticizing the way that Jane was planting the flowers. John said, "Never mind, Mary, all roads lead to Rome."
2090	466	Some people learn by doing. Others have to be taught. In the long run, all roads lead to Rome.
2306	530	I didn’t cut the mustard as a hockey player.
2091	467	I’ve been running marathons for years now, so this 5K run will be a walk in the park for me.
2092	467	It’s clear that the role is a walk in the park for the veteran actor.
2093	467	If you think that test was a walk the park, then you better have gotten an A!
2094	468	I have too many irons in the fire at work right now, and it’s going to be tricky to balance all of them over the next few weeks.
2095	468	Don’t give her any more assignments right now—she has too many irons in the fire as it is.
2096	470	For most young adults, moving out is a whole new ball game.
2097	470	Though I have babysitting experience, raising my child is a new ballgame.
2098	470	Even though I considered myself a competent scientist, I quickly learned that college-level chemistry is a whole new ballgame.
2099	470	Discs are no longer popular among consumers. Streaming media is a whole new ball game in entertainment.
2100	470	I excelled at my job, but when I was promoted and given more responsibility, I discovered it was a whole new ball game.
2101	470	After two great batters joined the American baseball team, it was a whole new ball game.
2102	471	Lou, you can’t bury your head in the sand about your health—please, make an appointment with your doctor and get that rash checked out!
2103	471	A: "How has Peter been handling the break-up?" B: "Oh, just burying his head in the sand and ignoring his feelings."
2104	471	Many elected officials seem determined to bury their heads in the sand regarding the looming troubles predicted for the financial markets.
2105	471	Stop burying your head in the sand. Look at the statistics on smoking and cancer.
2106	471	Don’t be an ostrich and bury your head in the sand, hoping your problems will disappear.
2107	471	No one has the luxury of sticking their head in the sand when it comes to standing up for basic civil rights.
2108	471	It’s a stupid, head-in-the-sand approach to the global problem of nuclear waste disposal.
2109	471	Stop burying your head in the sand, Tim. Don’t pretend that everything’s all right.
2110	472	My allowance is burning a hole in my pocket! I can’t wait until school is over so I can go buy some baseball cards!
2111	472	Don’t let that bonus burn a hole in your pocket—save it up for something you really want.
2112	472	My Christmas bonus is burning a hole in my pocket, so I think I’m gonna get some new speakers.
2113	473	I trusted her blindly, but when I was in need too much and called her for help, she showed her true colors.
2114	473	David looked nice initially, but he showed his true colors when I asked him for help.
2115	473	The American team showed their true colors by beating China.
2116	473	After being elected, the corrupt politician showed his true colors.
2117	473	Mark eventually showed his true colors and revealed that he was manipulative and selfish.
2118	473	As social media became more popular, fans got to see Janelle’s true colors outside of the show.
2119	473	Don’t trust Olivia. I’ve seen her true colors.
2120	474	I know you’re discouraged after getting fired, but you need to get back on the horse that bucked you and start looking for work.
2121	474	I’ve been single for three years since my divorce, but now I think it’s time to get back on the horse and start dating again.
2122	474	When I taught my first yoga class, it was a total disaster, but if I want to improve, I know I need to get back on the horse sooner than later.
2123	476	I’ve been rather gun-shy about driving ever since I got into that car accident last year.
2124	476	Yeah, I’m feeling gun-shy—any time I hit on a woman lately, I get rejected!
2125	476	A: "Since when are you gun-shy about speaking your mind?" B: "Since I got ridiculed at last week’s staff meeting."
2126	477	I know you’re trigger-happy, but quit shooting or you’ll scare off all the animals!
2127	477	Whenever I’m editing, I always get a little trigger-happy with the delete key and end up having to add some things back later.
2128	477	Don’t pass to Rick. He’s trigger-happy and shoots every time he gets the ball.
2129	477	The firing continued throughout the night, trigger happy soldiers making sleep impossible.
2130	478	It doesn’t matter how much money you make in your lifetime—you can’t take it with you when you go.
2131	478	Quit buying so much expensive stuff! You can’t take it with you!
2132	478	She’s 75 years old, so I don’t get why she’s still so worried about saving money. I mean, you can’t take it with you, you know?
2133	478	Enjoy it now. You can’t take it with you.
2134	479	I don’t like spicy food, so I hope this salsa doesn’t pack a punch.
2135	480	I’m glad Tony started repaying the money he borrowed from me, but the five dollars he gave me yesterday is just a drop in the bucket compared to what he still owes.
2136	480	We’ve recruited hundreds of people to help, but it’s still a drop in the bucket if we’re going to clean up this oil spill in its entirety.
2137	480	Sure, I’d rather someone donate $20 than nothing, but it’s just a drop in the bucket when you think of how much money we’re trying to raise.
2138	480	Jane: We need to stop spending so much. Alan: OK. I’ll buy a cheaper brand of toothpaste. Jane: But that’s just a drop in the bucket.
2139	480	Many companies donated food and medicine to help the survivors of the earthquake, but it was just a drop in the ocean of what was needed.
2140	481	But all of this superstition is of course just the opiate of the masses, designed to make you feel better about the chaos of the world and the fear of death, while remaining in service to an organization that directly benefits from your financial contributions.
2141	481	All of these pieces of technology, these video games, these television shows, they are all the opiate of the masses, keeping us blind and numb to the machinations of the corporations and politicians that control everything.
2142	482	Over 20 years, he created an iron-fisted dictatorship, but when the revolution came, he and the small few who controlled the country were summarily executed or driven into exile. Truly, the bigger they are, the harder they fall.
2143	482	That bully thinks he’s untouchable, but the bigger they are, the harder they fall.
2144	483	The boss hasn’t been down to the warehouse in months, so he has no idea that there are so many issues in here. Out of sight, out of mind, I suppose.
2145	483	Just sweep everything under the sofa—out of sight, out of mind.
2146	483	Ever since I moved, none of my old friends have gotten in touch with me. It’s out of sight, out of mind with them, evidently. My electric bill somehow got moved to the bottom of the stack on my desk, and I forgot all about paying it. out of sight, out of mind.
2147	483	Then I went away for six months and he lost interest. Out of sight, out of mind.
2148	483	We just take for granted the fact that once we’ve used something up we put it in that bin and away it goes—out of sight, out of mind.
2149	483	Absent employees may miss out on promotion prospects too—out of sight may well mean out of mind.
2150	484	I work from home, so I’m able to wear several hats: stay-at-home dad, soccer coach, and website developer.
2151	484	Both our editorial assistant and our copywriter left the company at the same time, so I’ve been wearing several hats ever since.
2152	485	My father could fix cars, build furniture, and program computers—he was a jack of all trades.
2153	485	John can do plumbing, carpentry, and roofing—a real jack of all trades. He isn’t very good at any of them.
2154	485	Take your car to a certified engine mechanic, not a jack of all trades.
2155	485	His father, after leaving the army, was a jack of all trades.
2156	485	His critics sometimes described him as a jack of all trades.
2157	485	I believe in specialization. Too many photographers are jacks of all trades and masters of none.
2158	485	He repairs cars, he paints houses, he makes furniture. He’s a real jack of all trades.
2159	486	Some of my terminally ill patients have said that they enjoy life more once they know that death is imminent. The nearer the bone, the sweeter the meat, I guess.
2160	488	I never knew my father very well. Apparently he got really restless after my sister was born, anxious not to be tied down to one place or job, so he just started moving around the country on his own. A rolling stone gathers no moss, as they say.
2161	488	I was just so eager to get out there and see the world, living in as many countries and trying as many new things as possible. A rolling stone gathers no moss, and I felt allergic to moss at the time.
2162	488	When I was younger, I lived quite a nomadic existence—my mantra might as well have been, "A rolling stone gathers no moss." Now, though, I kind of wish I had a family of my own.
2163	488	I worry about Tom. He’s never lived in the same place for two years in a row, and he keeps changing jobs. A rolling stone gathers no moss.
2164	488	I’m saying that it’s not a good idea to get too settled—a rolling stone gathers no moss.
2165	488	I guess you could call me a rolling stone. My home is out on the waves.
2166	489	A: "I needed to drain the washing machine to try and unblock it, so I used an old bike tube to funnel the water out the back door." B: "Wow, necessity is the mother of invention, huh?"
2167	489	When the fan belt on Linda’s car broke in the middle of the desert, Linda used her stockings as a replacement. Necessity is the mother of invention.
2168	489	"So how did you manage to open the bottle?" "I used a bit of wire and a stick. Necessity is the mother of invention, as the saying goes."
2169	490	Jake tried to repair his relationship with his girlfriend after forgetting her birthday, but she viewed his efforts as a day late and a dollar short.
2170	490	Unfortunately, your A on the final exam is a day late and a dollar short—you’re still getting a C on your report card because you didn’t hand in one homework assignment all semester.
2171	490	I needed you to publicly support me before the election! Now, it’s a day late and a dollar short!
2172	490	Tommy, you seem to show up a day late and a dollar short all the time. You need to get organized.
2173	492	We may have lost the battle for now against this unjust law, but we’re confident that we will win the war when it comes before the Supreme Court next month.
2174	492	By forcing the enemy to expend so many troops and resources, they’ll be too depleted to defend our other avenues of attack, so while we lost this battle, we’ll now be able to win the war.
2175	493	We’re starting to get into uncharted waters exploiting these tax loopholes. If we aren’t careful, the government may crack down on us hard!
2176	493	John keeps himself so closed off that I’ve never understood the uncharted waters of his emotions.
2177	493	As I opened up the computer to try and fix the problem, I realized that I was getting into completely uncharted waters and decided to leave it to the experts.
2178	496	You can dress up his treasonous actions with whatever heroic descriptors you like, but it still remains treason. A rose by any other name, as they say.
2179	496	Honestly, I don’t care if they end up changing the name of my town. A rose by any other name would smell as sweet, and this will always be home.
2180	496	A: "Do they really think that changing the company’s name is going to effectively distance it from the scandal?" B: "Yeah, I don’t get it. A rose by any other name, and all that."
2181	496	Bob was upset when his job title was changed from "administrative assistant" to "secretary." We tried to convince him that a rose by any other name would smell as sweet.
2182	497	After so many people dismissed her, Lisa had the last laugh by moving to Hollywood and becoming a well-known character actress.
2183	498	The dictator has made it very clear by these actions that he is more than willing to eliminate anyone who refuses to kiss the ring.
2184	498	We’re not going to bow down to the governor’s demands and just blindly kiss the ring. What she’s doing is wrong, and we won’t stand for it!
2185	500	Russ picked on me back in high school, and now he has his own bully. What goes around comes around.
2186	500	So he finally gets to see the results of his activities. What goes around, comes around. Now he is the victim of his own policies. Whatever goes around comes around.
2187	500	If they do something wrong, they believe that what goes around comes around.
2188	500	I just think what goes around comes around, and I’m hoping that in the past I’ve done something for somebody and it’s come back to me.
2189	500	In fashion what goes around comes around, and men are now wearing 1920’s style trousers.
2190	500	These ideas are similar to those being suggested forty years ago. What goes around comes around.
2191	500	I feel a little sorry for her but I guess she never helped anyone and what goes around comes round.
2192	502	While it’s sad that the results have not been as good as you expected, you should now focus on moving ahead and achieving better results next time; there is no use crying over spilt milk.
2193	502	Valarie’s car was badly damaged in the accident, and he was angry about what had happened, but he soon realized that there was no use crying over spilled milk.
2194	502	It’s no use crying over spilt milk; it was a bad investment, the money has been lost, and there’s nothing we can do.
2195	502	Mona was unable to accept the reality of her divorce. She was crying over spilled milk.
2196	502	The school trip had been a disaster, but we did not want to dwell on it. It was no use crying over spilled milk.
2197	503	I know it’s easy to be smitten with a romantic partner, but it isn’t healthy to put someone up on a pedestal.
2198	503	Stephen has been putting classic literature on a pedestal ever since college, so he gets really judgmental of other genres he deems to be inferior.
2199	503	I put my own parents on a pedestal. I felt they could do no wrong.
2200	503	He had set her on a pedestal.
2201	503	The Emperor is still safely on a pedestal.
2202	504	The ivy league university was always criticized for being an ivory tower, disconnected from the issues of the real world.
2203	504	Despite his insane wealth and success, Elon never retreated into an ivory tower.
2204	504	The science professor, while utterly brilliant, often seemed to be speaking from an ivory tower, using terms none of us could begin to understand.
2205	504	To solve these world problems, we need practical solutions, not theories from the ivory tower.
2206	504	I plan to be a world-famous author one day, bigger than JK Rowling, but I’ll never live in an ivory tower.
2207	504	When I met my husband, I had no idea he came from a family that lived their lives in intellectual ivory towers.
2208	505	My sister was a troublemaker as a teenager, yet she’s always on her high horse lecturing me about my life choices.
2209	505	The radio host is known for climbing on his high horse when talking to listeners and guests about the importance of family values.
2210	506	Can’t you just turn a blind eye to this little incident, instead of telling Mom and Dad?
2211	506	If regulators hadn’t kept turning a blind eye for so many years, thousands of consumers might not have suffered from the company’s infractions.
2212	506	The usher turned a blind eye to the little boy who sneaked into the theater. How can you turn a blind eye to all those starving children?
2213	506	The authorities were turning a blind eye to human rights abuses.
2214	506	She chose to turn a blind eye to what she suspected was going on.
2215	506	You’re not trying to suggest I should turn a blind eye and forget all about it?
2216	506	There’s so much suffering in the world, you can’t just turn a blind eye to it.
2217	506	The police here seem to turn a blind eye to petty crime.
2218	507	A: "What’s wrong, sonny? Cat got your tongue?" B: "Oh, he’s just shy around new people, that’s all."
2219	507	Has the cat got your tongue? Why am I the only one doing all the talking?
2220	507	A: "Cat got your tongue?" B: "I’m just not feeling well, that’s all."
2221	508	I’ve been dating Jenny for over a year, and I still think she’s a hard nut to crack!
2222	508	Figuring out the best way to modernize our product without alienating existing customers is definitely a hard nut to crack.
2223	508	The spy we captured is a hard nut; he hasn’t said a thing since we began the interrogation.
2224	508	This problem is getting me down. It’s a hard nut to crack.
2225	508	Tom sure is a hard nut to crack. I can’t figure him out.
2226	509	I have no savings, so if I get fired from my job, I’ll be up shit creek without a paddle.
2227	509	Shouldn’t we stop for gas? We’ll be up shit creek if the car dies on that desolate road ahead.
2228	509	There I was, at Disney World with only a measly $47.54. I was literally up the creek without a paddle.
2229	509	You are up a creek! You got yourself into it, so get yourself out.
2230	513	Seeing Jessica with her new girlfriend reopened a lot of old wounds this afternoon.
2231	513	The fight got pretty nasty, and we both started reopening old wounds from years ago.
2232	514	After losing the championship match, it really poured salt in John’s wound for his girlfriend break up with him the next day.
2233	514	My pride was already hurting when I didn’t get the job, but hearing that they gave it to Dave really poured salt into the wound.
2234	514	I can’t believe you would ask me to pay you back on the day that I got laid off. Thanks for pouring salt in my wounds, man.
2235	515	Don’t worry, boss, that no-good snitch will be swimming with the fishes before sunrise.
2236	515	He’ll be swimming with the fishes if he so much as breathes a word of our operations to anyone.
2237	515	I can’t believe you were stupid enough to get involved with the mob. If you cross them, you’ll be swimming with the fishes!
2238	516	I’ve been working on this book for over a year, but I can finally see the light at the end of the tunnel.
2239	516	Now that the doctors have been able to diagnose what’s wrong with me, there is finally light at the end of the tunnel.
2240	516	After horrific times we are seeing light at the end of the tunnel.
2241	516	People feel hopeless. They don’t see any light at the end of the tunnel.
2242	516	Business has been bad recently, but I think we’re beginning to see some light at the end of the tunnel.
2243	519	He’s putting his finger in the dyke, but he really needs to completely overhaul his monthly expenses to keep from going bankrupt.
2244	519	We can’t just keep putting our fingers in the dyke every time there’s a security breach—we need to figure out how hackers keep getting into the system.
2245	520	It was a hard pill to swallow learning that my father’s fortune had been squandered.
2246	520	Her recent breakup with Janet was a hard pill to swallow.
2247	520	Not getting into my top choice college was a hard pill to swallow, that’s for sure.
2248	521	Despite his fear of the dentist, John decided to bite the bullet and make an appointment.
2307	530	Do you really think he can cut the mustard?
2249	521	The company was losing money, so they had to bite the bullet and lay off several employees.
2250	521	Knowing it would be a difficult conversation, she bit the bullet and talked to her boss about the problem.
2251	521	Realizing the surgery was necessary, he bit the bullet and scheduled the procedure.
2252	521	After years of neglecting their health, they finally bit the bullet and started a rigorous exercise program.
2253	522	Now that I have a full-time job, I’m bringing home the bacon!
2254	522	My wife brings home the bacon, while I watch the kids.
2255	522	No, working in a canning factory isn’t exactly glamorous, but I’ve got to bring home the bacon somehow.
2256	522	After so many losing seasons, we definitely need a new quarterback—someone who can really bring home the bacon.
2257	522	It sounds like your presentation to the committee brought home the bacon—well done.
2258	522	You’ll have to be tougher than that during negotiations if you want to bring home the bacon in this industry, kid!
2259	522	I’ve got to get to work if I’m going to bring home the bacon.
2260	522	Go out and get a job so you can bring home the bacon.
2261	522	Sadly, we can’t both stay at home and look after the kids—someone needs to bring home the bacon.
2262	522	In the past, husbands needed someone to cook and keep house and wives needed someone to bring home the bacon.
2263	522	Reid and Duffield showed that they and other jockeys like them are capable of bringing home the bacon in style.
2264	522	The team is still top of the Premiership league, in prime position to bring home the bacon.
2265	522	Mr Montgomery was able to sack Mr Hargreaves , who had evidently not brought home the bacon.
2266	522	The firm wants very much to get this contract, and we’re expecting you to bring home the bacon.
2267	522	He’s the one who brings home the bacon, not his wife.
2268	523	The CEO buttered her bread on both sides, secretly investing in oil companies while publicly backing green energy initiatives to gain popular support.
2269	523	In trying to strike a trade deal with the two nations, it’s clear that the prime minister is trying to butter his bread on both sides.
2270	523	I know you want to capture as many votes has you can, but you can’t actually butter your bread on both sides. You need to be up front about which party you’re running for.
2271	523	The duke was accused of buttering his bread on both sides, adorning every inch of his home in gold and jewels and holding feasts far too large for the people who attended them.
2272	523	A: "She’s the rare celebrity who chooses not to butter her bread on both sides." B: "That’s probably why she still has money."
2273	523	No thank you—I have no desire to butter my bread on both sides and host lavish parties for people I don’t even know.
2274	525	You will need to have deep pockets to turn this shabby old building into an attractive store.
2275	526	I’m not going to tell you what we’re planning for your birthday, so ask me no questions, and I’ll tell you no lies.
2276	526	A: "We want you to tell us the absolute truth about this." B: "Ask me no questions, I’ll tell you no lies."
2277	526	A: "Come on, she’s his assistant—of course she knew he was stealing money from the company." B: "She did say, "Ask me no questions, and I’ll tell you no lies" when I tried to talk to her about it."
2278	527	The undercover agent, posing as a drug manufacturer, found himself in the belly of the beast after being invited to meet the city’s crime lord.
2279	527	As a business person, she spent her entire career railing against a government she claims is corrupt. Now she’s in the belly of the beast as a newly elected US senator.
2280	528	I’ve been on a wild goose chase trying to find a bag of Dan’s favorite potato chips.
2281	528	Those jerks sent me on a wild goose chase to find a copy of a book that hasn’t been released yet!
2282	528	I wasted all afternoon on a wild-goose chase.
2283	528	John was angry because he was sent out on a wild-goose chase.
2284	528	Every time I’ve gone to Rome to try to find out if the story could be true, it has turned out to be a wild goose chase.
2285	528	I hope I haven’t been sent off on another wild goose chase.
2286	528	The struggle to align the clock and the heavens’, then, is ultimately the story of mortal vanity, or at least a wild goose chase.
2287	528	He gave us the wrong directions to the station and that led us off on a wild goose chase.
2288	528	Peter’s story sent the police on a wild goose chase. They soon realized he’d been lying.
2289	529	My father could fix cars, build furniture, and program computers—he was a jack of all trades.
2290	529	John can do plumbing, carpentry, and roofing—a real jack of all trades. He isn’t very good at any of them.
2291	529	Take your car to a certified engine mechanic, not a jack of all trades.
2292	529	His father, after leaving the army, was a jack of all trades.
2293	529	His critics sometimes described him as a jack of all trades.
2294	529	I believe in specialization. Too many photographers are jacks of all trades and masters of none.
2295	529	He repairs cars, he paints houses, he makes furniture. He’s a real jack of all trades.
2296	530	I need a new worker from the temp agency—the one you sent over keeps mixing up orders and just isn’t cutting the mustard.
2297	530	This toaster doesn’t cut the mustard anymore. No matter what setting you choose, your toast comes out charred!
2298	530	Do you really think Bill will be able to cut the mustard in Sales? His numbers are never that great.
2299	530	That guy looks like he’s 110 years old—there’s no way he’ll be able to cut the mustard stocking shelves all day!
2300	530	We’ve got to vote in politicians who actually cut the mustard and get things done for their constituents!
2301	530	This is a very fast-paced environment—not everyone can cut the mustard working here.
2302	530	I can’t believe you cut the mustard in the car. Now we have to smell it all the way home!
2303	530	Ugh, who cut the mustard in here?
2304	530	Uncle Ned had a bean burrito for dinner, so it’s only a matter of time until he cuts the mustard.
2305	530	But if you want to go beyond this into hypersonic flight they just don’t cut the mustard.
2308	531	He tried pulling the wool over our eyes by hiding the profits in separate accounts, but we were quick to catch onto his scheme.
2309	531	Be prepared for your kids to try to pull the wool over your eyes when they’re teenagers.
2310	532	He’d have a real shot at winning the election if he didn’t keep shooting himself in the foot with such inflammatory remarks.
2311	532	I think we shot ourselves in the foot by firing her, because she knew more about the project than anyone else.
2312	532	If I was to insult the contestants I would be shooting myself in the foot.
2313	532	The shop ran a 25 per cent off sale early in December. It now looks as if it shot itself in the foot, attracting people who meant to shop there anyway to do so during the promotion instead.
2314	532	The only thing the Royal Opera seems to have done successfully is shoot itself in the foot.
2315	532	You’d better prepare your argument carefully—you don’t want to shoot yourself in the foot.
2316	533	Ah, to be in love in your salad days—such blissful and carefree times!
2317	533	Whenever I ask my grandfather the meaning of a word I hear on TV, he always laughs and says he’ll tell me when I’m no longer in my salad days.
2318	533	The Grand Hotel did not seem to have changed since her salad days.
2319	533	Back in my salad days my friends and I used to go dancing every Saturday night.
2320	534	Hey, I have a bone to pick with you! Why didn’t you put gas in my car after you borrowed it?
2321	534	Uh oh, the boss looks like she’s got a bone to pick. I wonder who screwed up this time.
2322	534	Jerry, we’ve got a bone to pick with you about how you leave your dirty dishes in the sink for days at a time.
2323	535	I can’t worry about that now, I’ve got bigger fish to fry!
2324	535	I want Chris to help me with this project, but he claims he has bigger fish to fry right now.
2325	535	Ignore the phone—we’ve got bigger fish to fry with half of the staff locked out of the department!
2326	536	Getting all of the extended family into their right places for the reunion photo was like herding cats!
2327	536	It’s like herding cats trying to manage all these different software development teams.
2328	536	Trying to get my two toddlers out the door these days is like herding cats!
2329	537	Doug is a bully—of course he won’t like it when his victims fight back and give him a taste of his own medicine.
2330	537	This team likes to play rough, so let’s go out there and give them a taste of their own medicine!
2331	537	The coup gave the dictatorship a dose of its own medicine, subjecting the dictator and his entourage to torture and confinement in deplorable conditions.
2332	537	Now you see how it feels to have someone call you names! You are getting a taste of your own medicine! John, who is often rude and abrupt with people, was devastated when the teacher treated him rudely. He doesn’t like having a dose of his own medicine.
2333	538	My brother’s eschewed the idea of a full-time career and has had every oddball job you could think of, but then he’s always been happy marching to the beat of his own drum.
2334	538	Look, I respect the fact that you like to march to your own drum, but do you have to make a point of doing everything in a counter-cultural way?
2335	539	Billy’s the one who broke the cookie jar—cross my heart and hope to die!
2336	539	A: "Did you take that money?" B: "No, cross my heart!"
2337	539	No, I didn’t tattle on you to the teacher—cross my heart and hope to die!
2338	540	We used to get hundreds of qualified candidates, but lately I feel like we’ve been scraping the bottom of the barrel with the applicants we bring in.
2339	540	A: "These were the best you could get?" B: "Sorry, the selection was already picked through, so I really had to scrape the bottom of the barrel even to find those."
2340	540	You’ve bought a bad-looking car. You really scraped the bottom of the barrel to get that one. The worker you sent over was the worst I’ve ever seen. Send me another
2341	540	and don’t scrape the bottom of the barrel.
2342	540	They were really scraping the bottom of the barrel when they picked you.
2343	541	To my co-workers, that old video of me acting like an idiot is the gift that keeps on giving. Teasing me about it is their favorite pastime.
2344	541	I’m telling you, my membership to the yoga studio has been the gift that keeps on giving! I’ve made so many new friends, strengthened my body, and reduced my anxiety.
2345	542	Why don’t you sleep on the offer and let us know your decision in the morning?
2346	542	I’m still not sure if I’m ready to spend that much money. Can I sleep on it?
2347	543	Don’t sleep on this song—it’s so good!
2348	543	A lot of people slept on this team coming into the playoffs, but now everyone is waking up to how good they are.
2349	544	Once I started researching my family tree for my dad’s side, I went down the rabbit hole of genealogy and spent hours tracing my ancestors all the way back to the age of piracy.
2350	544	I swear, internet rabbit holes were created to keep people with ADHD busy.
2351	544	Reading philosophy can send you down the figurative rabbit hole of existential questions.
2352	544	Candace started watching one video on DIY crafts and went down the rabbit hole, ending up with a cart full of art supplies she’ll never use.
2353	544	Be careful with social media debates; going down the rabbit hole and losing track of time is too easy.
2354	544	The detective went down the classic rabbit hole of clues, hoping to solve the mysterious case of the missing person.
2355	545	The point of this legislation is to level the playing field for those who have typically found it harder to access public funding.
2356	545	The acquisition of the star player in the offseason was intended to level the playing field with their main rivals, who have become perennial champions.
2357	545	There is a high demand for new laws and restrictions to be introduced in order to level the playing field.
2358	546	A: "We can’t let that stool pigeon testify in court!" B: "Don’t worry, boss, his ass is grass."
2359	546	I bet Ray went on the run because he knew his ass was grass if he stuck around here.
2360	546	A: "Are those gunshots?" B: "Come on, we’ve got to hide! The deal went sideways and now my ass is grass!"
2361	546	You say that to me one more time, and your ass is grass, Jim!
2362	546	Quit looking at my girlfriend, loser, or your ass is grass!
2363	546	I can’t believe Billy mouthed off to that bully. Man, his ass is grass now.
2364	546	A: "I heard Sarah got caught stealing from the cash registers." B: "Yeah, it looks like her ass is grass."
2365	546	Dude, if my parents find out I took the car without their permission, my ass is grass!
2366	546	You broke Mom’s antique vase by playing catch in the house? Ooh, your ass is grass!
2367	546	You do that again, and your ass is grass!
2368	547	A: "What do you mean I’m being sued by my ex-wife? I’ll knock your lights out!" B: "Hey man, I’m just doing my job. Don’t shoot the messenger!"
2369	547	A: "What do you mean I’m being sued by my ex-wife? I’ll knock your lights out!" B: "Hey, I’m just here to deliver the subpoena. Don’t shoot the messenger!"
2370	547	Hey, don’t shoot the messenger! I just happened to overhear some of the teachers talking, and I thought you guys would like to know that you’re getting a pop quiz in History today.
2371	547	I’m a news anchor—it is my job to report the news, even the bad stuff. But some people want to shoot the messenger, as if I were the one who caused the bad news to begin with.
2372	547	In blaming the polling organization for his party’s failure, Sir Malcolm is shooting the messenger.
2373	547	"You look awesome! But..." "But what?" "Well, don’t shoot the messenger here but those pants make you look a little... large."
2374	548	I know you’re frustrated with our local "do-nothing" politicians, but I often tell myself, "Don’t hate the player, hate the game." I mean, our political system seriously limits the effectiveness of our politicians, especially if their party is not currently in power.
2375	548	A: "That is simply not fair. I work twice as hard as you, but you got the promotion because you play along with all the office politics." B: "Hey, don’t hate the player, hate the game!"
2376	548	Don’t hate the player, hate the game—and accept that you’ve got to start schmoozing and networking too if you want to get ahead.
2377	549	Sky-diving is the number-one thing on my bucket list.
2378	549	You’ll finally be able to cross off hang gliding on your bucket list!
2379	549	I’d love to go to Bali someday. That’s definitely on my bucket list.
2380	550	Once the CFO and CEO were revealed to be partners in crime, they were both fired for their involvement in the embezzling scandal.
2381	550	If Seth is here, Jimmy can’t be far behind—those two are partners in crime.
2382	550	The sales manager and the used-car salesmen are nothing but partners in crime.
2383	550	The legal department and payroll are partners in crime as far as the average worker is concerned.
2384	550	My evening begins with watching possibly the worst romance I’ve ever seen, with my movie partner in crime, Monique.
2385	550	He presented his last programme with partner in crime Will Anderson last Friday.
2386	551	Any way you slice it, Mr. Smith is guilty.
2387	551	I forgot my textbook in my locker last night so, any way you slice it, I’m going to fail this test!
2388	551	Bro, any way you slice it, you’re getting grounded. Not only did you scratch up Mom’s car, she caught you lying about it!
2389	552	A: "I can’t believe you took credit for my idea just so you would look good to the boss!" B: "Come on, all is fair in love and war!"
2390	552	I told Jeff that Mary had a boyfriend because I wanted to ask her out first. Say what you will, but all is fair in love and war!
2391	552	Yeah, I sabotaged his science project, but so what? I want to win, and all is fair in love and war.
2392	552	So I had to flatter the boss in order to get that big promotion. All’s fair in love and war, right?
2393	552	I told Jeff that Mary had a boyfriend because I wanted to ask her out first. Say what you will, but all’s fair in love and war!
2394	552	Yeah, I sabotaged his science project, but so what? I want to win, and all’s fair in love and war.
2395	553	All these questions you’re asking are above your pay grade.
2396	553	He had some great ideas about how to run the company, but contributing such things was above his pay grade.
2397	553	I would love to sign off on those documents for you, Jim, but that’s above my pay grade.
2398	553	He soon realized that the details of the IT development project were a bit above his pay grade.
2399	553	Sorry, fishing garbage out of the lake is above my pay grade.
2400	553	Al’s a great handyman but electrical work is above his pay grade.
2401	554	I always get steak when I’m traveling on the company’s dime. Why not?
2402	554	My brother’s living at home on my parents’ dime and loves it. They’re going to have to kick him out.
2403	554	Oh no, you’re not buying a skimpy prom dress like that on my dime.
2404	555	Sarah: "I’m thinking about asking Jonathan out on a date." Jane: "I don’t know, I think he’s a little light in the loafers, if you catch my meaning."
2405	556	I don’t want to go to the gala tonight, but my wife is eager to rub elbows with the upper class.
2406	556	I’ve been rubbing elbows all night, and now I’d like to just have some quiet time.
2407	556	I don’t care to rub elbows with someone who acts like that! I rub shoulders with John at work. We are good friends.
2408	556	Diplomats rubbing elbows with heads of state.
2409	557	Don’t beat around the bush—just tell me the truth.
2410	557	Would you please stop beating around the bush? Are you leaving the company or not?
2411	557	You know layoffs are coming if the CEO is beating around the bush to this extent.
2412	557	Stop beating around the bush and answer my question.
2413	557	Let’s stop beating about the bush and discuss this matter.
2414	558	A: "Why were you talking to Katie? I thought you hated her." B: "I’m trying to see if she has any dirt on me for the student council debate. Keep your friends close and your enemies closer, right?"
2415	559	You rookies better not be worn out already—we’ve got another two periods to go if we want to win the Stanley Cup. Keep your eyes on the prize!
2416	559	I studied hard for midterms, keeping my eye on the prize of being named valedictorian.
2417	560	A: "Have you heard this band’s latest album?" B: "I didn’t even know it was out, it must have flown under my radar."
2418	560	Every year, the government promises to do something about the homelessness problem, yet every year it seems to slip under the radar again.
2419	560	With so many different amendments to the bill being made, some appropriations slipped under the radar.
2420	560	I plan to stay under the radar until this controversy blows over.
2421	560	The conflict has slipped below the radar screens of the mass media.
2422	560	Experts say a lot of corporate crime stays under the radar.
2423	561	The social worker has taken countless kids under his wing over the years, and many of them stay in contact with him years later.
2424	561	Diane didn’t know anyone when she moved out West, so I took her under my wing for a while and showed her around.
2425	562	With governmental resources already strained to the breaking point, any sort of environmental disaster would be the straw that breaks the camel’s back.
2426	562	I was already fed up with his laziness and insensitivity, but Jim’s refusal to come with me to my own mother’s funeral was the straw that breaks the camel’s back.
2427	563	It’s a little late in the game to be changing details of the contract, don’t you think? They’re due to be finalized in the morning!
2428	563	Most analysts think it’s too late in the game for something to seriously shift the outcome of the election on Tuesday.
2429	564	I’ve been a good sport about letting Tom share the credit for my work, but this is the last straw! I’m finally going to expose him for the liar he is.
2430	564	OK, that’s the last straw, kids! I told you to stop shouting back there, and now I’m turning this car around.
2431	564	When our best player came down sick, that was the straw that broke the camel’s back. We hoped to make the playoffs, but lost all the rest of our games.
2432	564	When she showed up late a third time, that was the straw that broke the camel’s back. We had to fire her.
2433	564	This is the last straw. I’m calling the police.
2434	565	The kids are having fun connecting the dots and making pretty pictures for us.
2435	565	My daughter never really enjoyed connecting the dots. She always preferred drawing her own pictures.
2436	565	A: "Wow, did you connect the dots? And what do you see now?" B: "A boat!"
2437	565	Once I started to connect the dots, I realized that, if they hadn’t called me by now, I probably wasn’t getting the job.
2438	565	Has she seriously not connected the dots yet? If he’s not texting her back, he’s not interested in her!
2439	565	Once my sister told me she was pregnant, I immediately connected the dots and made sense of all of her weird behavior lately.
2440	565	It’s not hard to connect the dots between crime and poverty.
2441	566	You’re dancing with the devil trading commodities like these—they can make you a fortune, but they can just as easily ruin you.
2442	566	The show follows a character who starts out as a straight-laced accountant, but who starts to dance with the devil as she enters the world of organized crime.
2443	566	Is the quick payday worth dancing with the devil to get it? These guys are seriously shady—I bet their "business" is just a front.
2444	566	I know you think this guy can boost your career, but considering some of the stuff people say he’s involved in, well, you’re dancing with the devil if you ask me.
2445	566	The activist has been accused of dancing with the devil after she was spotted having dinner with the CEO of one of the conglomerations her charity opposes.
2446	566	If you dance with the devil like this, you’re gonna meet his thugs when you can’t pay up.
2447	567	If push comes to shove, I have some extra savings I could tap into.
2448	567	We’ll at least have some leverage in the negotiations if push comes to shove.
2449	567	When push comes to shove, I have some extra savings I could tap into.
2450	567	We’ll at least have some leverage in the negotiations when push comes to shove.
2451	567	When push comes to shove, you know I’ll be on your side. If push comes to shove at the meeting, the front office can back you up with some statistics.
2452	567	They knew they could sit back, and when push came to shove I’d do all the work.
2453	567	They wouldn’t support you, sir. If push came to shove, they wouldn’t be behind you.
2454	567	When push comes to shove, investors are not always impressed with promises of jam tomorrow.
2455	567	I don’t want to sell the house, but if push comes to shove, I might have to.
2456	567	If push comes to shove, the front office can help with some statistics.
2457	567	When push comes to shove, we’ll have to move to a cheaper place.
2458	568	Yes, the new hire is young, but she’s been around the block. She was managing a whole department at a prominent PR firm before she came here.
2459	568	Your aunt might seem boring these days, but she’s been around—she went to Woodstock as a teenager!
2460	568	Don’t even try it. I’ve been around the block enough to know a lie when I hear it!
2461	568	He’s just a kid. He hasn’t been around the block yet.
2462	569	When they were children, the two brothers operated on the principle of an eye for an eye, so that if the older one hit the younger one, the younger one was entitled to hit him back just as hard.
2463	570	My mom always seems to know when we’ve done something we shouldn’t. She has eyes in the back of her head!
2464	570	Look, just be very careful not to do personal things during the work day—the boss has eyes in the back of his head.
2465	570	A: "Get away from that cookie jar!" B: "Geez, Mom, do you have eyes in the back of your head?"
2466	570	She has eyes in the back of her head and is always alert to the slightest trouble or sign of trouble.
2467	570	When you have a two-year-old child, you need eyes in the back of your head.
2468	571	No one saw us take the money from the cash register, so we’re totally in the clear!
2469	571	The jury deliberated and determined that my client was in the clear.
2470	571	You’re in the clear. Go ahead and back up.
2471	571	Once the deer got into the clear, it ran away.
2472	571	Don’t worry, Tom. I’m sure you’re in the clear.
2473	571	I’ll feel better when I get into the clear.
2474	571	Then Rickmore spoke: "If your chief clerk confesses to the police what really happened, I’ll be in the clear."
2475	571	Their possessions had not been searched so they were not officially in the clear.
2476	571	That’s when the hospital called with the results of the tests, and I found out I was in the clear.
2477	571	There was more gloomy news for the Prime Minister in an opinion poll yesterday which showed the opposition five points in the clear.
2478	571	She told the police that Jim was with her when the burglary happened, so that put him in the clear.
2479	571	The evidence showed that the suspect was actually in the clear.
2480	572	After smoking for so long, I should have never tried to quit cold turkey—the withdrawal symptoms are unbearable.
2481	572	I’m so impressed that you stopped gambling cold turkey!
2482	572	You can’t just stop this medication cold turkey. I’ll give you a schedule to follow, and we’ll gradually taper the dosage down.
2483	572	Tom stopped smoking cold turkey.
2484	572	She gave up her drinking habit cold turkey and had no ill effects.
2485	572	The worst time was when he was going cold turkey.
2486	572	I quit smoking cold turkey (= I stopped suddenly and completely).
2487	572	Martha stopped cold turkey and survived.
2488	574	Can you make sense of these instructions? It’s all Greek to me!
2489	574	A: "Can you understand this error message?" B: "Sorry, Greek to me. You’d better ask one of the programmers."
2490	574	I thought I had a handle on Foucault’s theories, but this concept of his is all Greek to me.
2491	574	This contract is written in such complicated language that it’s all Greek to me.
2492	575	You remember how you said I would never get into law school? Well now I’m valedictorian. How do you like them apples?
2493	575	McCloskey’s is closing after 41 years in business. How do you like them apples?
2494	575	Either you deliver the dresses for the price we agreed on, or I’m going to go someplace else. How do you like them apples?
2495	576	She really broke the mold with her innovative approach to this notification system—several companies have since adopted her method.
2496	576	The company has been breaking the mold in researching a cure for the deadly disease.
2497	576	They’ve broken the mold with their latest product—I’ve never seen anything like it.
2498	576	His ambition is to create a third party and break the mould of US two-party politics.
2499	576	Together, these alternative, left-wing comics broke the British comedy mould in the late Seventies.
2500	576	These people shattered the mould of South African politics.
2501	576	Later that year, he launched a mould-breaking wine business.
2502	576	As the first female partner in one of Scotland’s top 10 legal firms, she was something of a mould-breaker in the legal world.
2503	576	The lifestyle magazine he launched in 1994 was a mould-breaker and a commercial success.
2504	576	After a string of defeats, he finally broke the mould by getting through to the semi-finals of a major competition.
2505	577	With the polls, the bookies, the European Union and the International Monetary System all agreeing (propagandizing) that Great Britain would vote to remain in the Union, it was a sure bet to any contrarian worth his salt that the opposite would happen.
2506	577	"Every black man in Wilmington who’s worth his salt," writes Trillin, quoting a black municipal court judge, "when he leaves his job in the evening and sees the convoys, something happens to him."
2507	577	Not so, says Mr Walsh, a veteran of Savills’ Abu Dhabi office, who, like any estate agent worth his salt, points to the benefits of this particular project.
2508	577	Also, bear in mind that most designers worth their salt absolutely abhor the idea of doing quality work for a lottery’s chance of getting paid anything at all.
2509	577	Making the concoctions may be a bit of a pickle, but it should be a cakewalk for you if you are a chef worth your salt.
2510	578	The steering is so good on this car that you can turn on a dime, even at high speeds.
2511	578	The running back turned on a dime and broke the tackle.
2512	578	He’s usually a nice guy, but his temper can turn on a dime sometimes.
2513	578	Politicians have no loyalty to their causes—they’ll turn on a dime if it means they’ll get more votes.
2514	578	This car can turn on a dime. I need a vehicle that can turn on a dime.
2515	578	Employers need to be flexible and to turn on a dime in order to stay competitive.
2516	578	Outdoors I heard the rain stop on a dime.
2517	578	A car that will turn on a dime at high speed without turning turtle is what I want.
2518	579	Don’t worry, boss, I’ll hold down the fort while you’re away.
2519	579	I’m going next door to visit Mrs. Jones. You stay here and hold the fort.
2520	579	You should open the store at eight o’clock and hold the fort until I get there at ten.
2521	579	Her husband holds the fort at their Norfolk home during the week.
2522	579	You can hold down the fort here. I shouldn’t be too long.
2523	579	I’m going abroad for a few weeks, and Kathy will hold the fort while I’m away.
2524	579	I left John there to hold the fort.
2525	580	Tell me about your first day at the new job—I’m all ears!
2526	580	You said you would tell me. Well, I’m all ears.
2527	581	I have been bending over backwards to make sure that you have a wonderful visit, and you don’t even care!
2528	581	The entire staff always has to bend over backward whenever the CEO comes to visit our office.
2529	581	Don’t bend over backwards to please these people—they’ll never appreciate it.
2530	581	He will bend over backwards to help you.
2531	581	I bent over backwards for you, and you showed no thanks!
2532	581	We bent over backwards to make them feel welcome and they didn’t thank us once.
2533	581	You’ve done your duty—you’ve leaned over backwards. She has nothing to complain about.
2534	582	The spoiled little brat has completely wrapped his parents around his little finger.
2535	582	It’s plain for everyone to see that Sarah is wrapping the boss around her finger.
2536	582	Ms. Smith gave Ben extra credit again. I hate the way he wraps her around his little finger.
2537	583	I’m no spring chicken, so I can’t stay out till 2 AM drinking and dancing anymore.
2538	583	That actress is no spring chicken, but she does a pretty good job of playing a twenty-year-old girl.
2539	583	Jane: How old do you think Robert is? Jill: Well, he’s certainly no spring chicken.
2540	583	At 51, she’s certainly no spring chicken.
2541	583	At 85, he’s not a spring chicken, but Enrico Cuccia is busier than ever.
2542	583	By comparison with the others, DelGuercio is a spring chicken.
2543	583	She must’ve been in at least her mid-forties, she was no spring chicken, but she looked good for her age.
2544	584	Whenever I go to bed with a racing mind, I make myself count sheep until I drift off to sleep.
2545	584	A: "Hey, what are you doing up so early?" B: "Ugh, I counted sheep for a while, but I just couldn’t get back to sleep."
2546	584	A: "What’s all that ruckus upstairs?" B: "When I tucked the kids in, they said they weren’t tired, so I told them to count sheep—I just did not anticipate them doing it out loud."
2547	585	Completing the summer study program gives pupils a leg up in the following academic year.
2548	585	Speaking three languages certainly gave Laura a leg up in the interview for the promotion.
2549	585	We had a leg-up on the competition after the celebrity endorsement of our products last month.
2550	585	I gave her a leg up over the fence, then I followed her over, and we ran down the road laughing.
2551	585	Cassy was glad that her grandmother had taught her some dressmaking skills when she was younger because now it gave her a leg-up when making party dresses for her three daughters.
2552	585	All those weekends spent fixing up old bangers with his father, has given Gabe a leg up in maintaining his first car.
2553	586	Because our only interaction with celebrities is through the media, it’s easy to forget that they are just human beings who put their pants on one leg at a time.
2554	586	The superstar comedian’s latest non-fiction book gives you a quirky insight into her day-to-day life, and reminds you that she puts her pants on one leg at a time just like the rest of us.
2555	586	Even though I made my millions at a young age, I was determined that I would still put my pants on one leg at a time just like everybody else.
2556	587	Word from the boots on the ground is that the enemy line is beginning to retreat.
2557	587	We need to get more boots on the ground if we want to win this skirmish.
2558	587	I’ve got boots on the ground assessing the threat, sir.
2559	588	The manager always likes to begin the weekly meetings with an informal discussion before getting down to the nitty-gritty.
2560	588	We eventually got down to the nitty-gritty and came up with a solution.
2561	588	We don’t need all the extraneous details you included with last month’s report. Just get down to the nitty-gritty.
2562	589	I’ve been driving for 36 years and have never been in an accident. Knock on wood!
2563	589	Hopefully, knock on wood, we’ll continue to avoid sickness this winter.
2564	589	I think I am well at last—knock on wood.
2565	589	I knock on wood when I wish something were true.
2566	590	Don’t worry, even with all his success, Robert is still the salt of the earth. He donates most of his salary to charity and volunteers weekly at the hospital.
2567	590	Mrs. Jones is the salt of the earth. She is the first to help anyone in trouble. Frank’s mother is the salt of the earth. She has five children of her own and yet fosters three others.
2568	591	Yeah, I was under the weather last week, but I’m feeling much better now.
2569	591	Do you remember last night at the bar at all? You were really under the weather!
2570	591	We were out celebrating Valerie’s birthday last night—that’s why we’re all under the weather today.
2571	591	I feel sort of under the weather today.
2572	591	Whatever I ate for lunch is making me feel a bit under the weather.
2573	591	Daddy’s had a few beers and is under the weather again.
2574	591	Wally’s just a tad under the weather.
2575	591	I’d been feeling a bit under the weather for a couple of weeks.
2576	591	She was suffering from stress and generally under the weather.
2577	591	She was off work for two weeks and she still seems a bit under the weather.
2578	591	Willy’s just a tad under the weather.
2579	592	The only fly in the ointment in an otherwise perfect wedding day was the fact that the bride tripped when walking down the aisle.
2580	592	I am excited to go to LA, but having to leave at 3 AM is a fly in the ointment.
2581	592	A: "You must be excited to spend some time with your crush." B: "I am, the only fly in the ointment is that we’re not going alone—Kelly and Laura are coming to the show with us."
2582	593	It gets good reviews, but the new sushi restaurant is really nothing to write home about.
2583	593	His performance has been nothing to write home about so far. To be honest, we were expecting much more out of him when we recruited him.
2584	593	I went to that new restaurant last night. It’s nothing to write home about.
2585	593	Jill: I went to see a movie last night. Jane: How was it? Jill: Nothing to write home about.
2586	593	The house was nothing to write home about—a rather neglected Victorian semi-detached like many they’d seen.
2587	593	The nightlife is not much to write home about.
2588	593	The beaches really are something to write home about.
2589	593	I daresay what I did was nothing to write home about, but it put food in her belly and shoes on her feet!
2590	593	I got a little bit of a raise this year, but it was nothing to write home about.
2591	594	Don’t worry about that snitch. We’ve sent a couple of hired guns around to his house, so he won’t be a problem for us much longer.
2592	594	Things have become so violent in the town that even the mayor has taken on some hired guns to keep him safe. The rebels brought in a few hired guns to help bolster their meager attack.
2593	594	The corporation has sent their best hired gun to convince the senator to vote against the environmental regulation bill.
2594	594	Because of the intricacy of the legislation, the company brought in a hired gun to ensure the merger deal didn’t hit any legal snags.
2595	595	I think she really dropped the ball when she decided to quit that promising internship.
2596	595	I know he’s rich, but if he’s also a total jerk, then how can you say she dropped the ball by breaking up with him?
2597	595	A: "My parents think I’m dropping the ball to leave school now." B: "Yeah, your parents aren’t the only ones. You’re so close to getting your degree!"
2598	595	I know I dropped the ball today—I just got swamped at work and completely forgot about picking the kids up from school.
2599	595	I’m sorry, I really dropped the ball when I forgot to water her plants.
2600	595	A: "Please tell me you didn’t drop the ball on this." B: "No, of course not—I know the report’s due today."
2601	595	Good grief! Bill dropped the ball, just as he was about to score!
2602	595	Everything was going fine in the election until my campaign manager dropped the ball.
2603	595	You can’t trust John to do the job right. He’s always dropping the ball.
2604	595	Some say the Academy dropped the ball last year by failing to recognize Linklater’s film in the Best Animated Feature category.
2605	595	There are people who’d like to see me fall, I know that. But I’m not afraid. I won’t drop the ball.
2606	595	I could use some help. I don’t want to drop the ball on this one.
2607	595	He thinks that you dropped the ball on the Swiss project.
2608	595	I didn’t want to be the one who dropped the ball, but I knew that someone would flub up.
2609	596	Can you please bury the hatchet and make up with your sister already? I can’t take the constant fighting.
2610	596	A: "Do you think Mom and Aunt Judy will bury the hatchet before we go away on vacation together?" B: "I hope so. If not, it’ll be super awkward for all of us!"
2611	596	Life is too short, guys, come on. Bury the hatchet.
2612	596	The surgeons have a strict protocol to avoid burying the hatchet, so to speak.
2613	596	If they do an autopsy on this woman and find that you buried the hatchet, her family is going to sue us for every penny we’re worth!
2614	596	No, I didn’t bury the hatchet exactly—but I did apparently leave a towel in the patient before closing her up.
2615	596	Let’s stop arguing and bury the hatchet.
2616	596	Tom and I buried the hatchet and we are good friends now.
2617	596	They had finally buried the hatchet after their falling-out.
2618	596	I’ve said I’m prepared to bury the hatchet, but John says he won’t forgive me for what happened.
2619	596	I’m sorry. Let’s stop arguing and bury the hatchet.
2620	596	The idea that a doctor would bury the hatchet is a very old joke.
2621	597	Many are worried that the controversial legislation will open the floodgates for other laws that curb free speech.
2622	597	Giving in to the strikers’ demands would open the floodgates to demands by workers in other state-owned industries.
2623	597	The floodgates were opened yesterday for cheaper new cars for thousands of motorists.
2624	597	If a company talks about introducing a wireless Lan, they have to be aware that the floodgates will open.
2625	597	HMOs and employer groups counter that challenges to the state laws have slowed litigation, but the Senate bill would open the floodgates to new suits.
2626	597	If the case is successful, it may open the floodgates to more damages claims against the industry.
2627	597	The discussion sessions allow people to open the floodgates to their deepest fears.
2628	598	And that’s why quantum physics is a hoax. Now, if you’ll excuse me, I need to go see a man about a horse.
2629	598	Beth’s dad is always "seeing a man about a horse." I think he needs some help because the family barely sees him anymore.
2630	599	Kevin said that you can get into the club for free if you wear red, but I’m taking it with a grain of salt.
2631	599	Take whatever that paper publishes with a grain of salt—it’s really a tabloid.
2632	600	You want me to tell our plans to Jill? No, I don’t think so—I trust Jill about as far as I can throw her.
2633	600	The government is asking us to believe that they’ll apply the new tax fairly, but I trust them about as far as I can throw them.
2634	601	Ugh, my sister’s victim act is driving me nuts. It’s like, "You have no friends because you sold everyone out on your way to the top. You made your bed, now lie in it."
2635	601	You don’t want to go to jail? Tough. You made your bed, now lie in it.
2636	602	He’s not the most aggressive fighter, but he relies on his endurance and skill, rolling with the punches to wear down his opponent until the best moment to strike.
2637	602	Losing my job was really tough, but I’ve just been trying to roll with the punches until I get back on my feet.
2638	602	Remember to roll with the punches during the debate—don’t get hung up on the mistakes that you make.
2639	602	You have to learn to roll with the punches. Accept what is dealt to you. Paul could never roll with the punches. He always had to get even.
2640	602	He has impressed all sides by his ability to negotiate and willingness to roll with the punches.
2641	602	He has had to learn how to roll with the punches and seek out the positive in every problem.
2642	602	Well, there’s nothing we can do to change things. We’ll just have to learn to roll with the punches.
2643	603	Respect is a two-way street—you have to give it if you expect to receive it.
2644	603	This is a two-way street, you know. You will have to help me someday in return. Friendship is a two-way street.
2645	603	This is a two-way street, you know. You will have to help me someday in return.
2646	604	Having already lost a massive sum, he decided to double down an already huge bet to try to win back some of his money.
2647	604	I can’t believe you actually doubled down and won! Look at all these chips!
2648	604	No, don’t double down. Considering the money you’ve already blown tonight, you’re better off walking away from the blackjack table!
2649	604	The president made clear that he intends to double down the government’s involvement in the war overseas.
2650	604	With the market booming, many companies are doubling down their development in mobile apps and games.
2651	604	If you double down this divisive rhetoric, sir, I just worry that you’ll alienate more voters.
2652	604	The dealer dealt me a good hand, so I doubled down.
2653	605	The other team’s offense was incredibly aggressive, but our defense stood their ground.
2654	605	Despite the guy’s size, I managed to stand my ground during the fight.
2655	605	The boss scoffed at her idea initially, but she stood her ground and explained it in greater detail.
2656	605	He kept offering me less money, but I stood my ground and got the full asking price.
2657	605	The shooter’s state has a stand your ground law, so it’s unlikely he’ll face any charges, even though the man he shot was unarmed.
2658	605	It’s still too early to tell whether the prosecutor will consider this a case of "stand your ground."
2659	605	The lawyer tried to confuse me when I was giving testimony, but I managed to stand my ground. some people were trying to crowd us out of the line for tickets, but we held our ground.
2660	605	In spite of the enemy’s fierce attack, we stood our ground and eventually they had to retreat.
2661	605	After arguing about future policy for three hours, he was still standing his ground.
2662	607	After a long week at work, I like to blow off steam by going for a run in the park.
2663	607	Instead of arguing, they decided to blow off steam by playing a friendly game of basketball.
2664	607	The team went out for dinner to blow off some steam after a tough loss in the championship.
2665	607	Jane often blows off steam by spending quiet evenings reading a good book.
2666	607	When stress builds up, taking a day off to relax and do nothing is a great way to blow off steam.
2667	608	Tommy was caught with the marijuana in his backpack, but he threw me to the wolves and said it was mine.
2668	608	Our manager never hesitates to throw an underling to the wolves when something goes wrong in the office.
2669	609	Senator Davis was supposed to be working with me to bridge the gap between Democrats and Republicans on the issue of gun control, but, instead, she threw me under the bus to get a boost in the polls with her constituency.
2670	609	The investment company threw its clients under the bus when it chose to redirect their hard earned money into various Ponzi schemes that benefited only a few board members at the top.
2671	609	Tommy was caught with the marijuana in his backpack, but he threw me under the bus and said it belonged to me.
2672	609	Our manager never hesitates to throw an underling under the bus when something goes wrong in the office.
2673	610	Why are you eating spaghetti with your hands? Were you raised by wolves?
2674	610	He’s so rude, it’s like he was raised by wolves!
2675	611	And we’re committed to helping them turn customers’ digital breadcrumbs into actionable insights that allow them to better predict—and explain—the choices those customers make.
2676	611	In 1979, Danny Brown and his wife Sherry, both second-generation amusement industry people, followed the breadcrumb trail left by their parents and worked as independent concession owners traveling between large fairs in California.
2677	611	But in too many cases, the breadcrumb trail starts with suspicious ones and zeros—with digital propaganda that we still struggle to counter.
2678	611	A Thick Trail of Breadcrumbs Leads to Aspiring New York Police Officers
2679	611	Everything we do on the Internet leaves a trail of breadcrumbs about our location, finances and relationships.
2680	612	No one leaves their dirty laundry in the hallway—get with the program!
2681	612	If you don’t get with the program soon, you’re going to be off the team.
2682	612	A: "You saw my report card?" B: "Yeah, and you seriously need to get with the program if you want to keep your scholarship."
2683	612	Come on, Mark. Get with the program. Do what you are told.
2684	612	Jane just can’t seem to get with the program. She has to do everything her way, right or wrong.
2685	612	Frank, we have work to do, remember? Get with the programme.
2686	612	You’re through if you don’t get with the program.
2687	613	That argument we had is just water under the bridge now—don’t even worry about it.
2688	613	He didn’t treat me very well at the time but it’s all water under the bridge now.
2689	613	Mr Bruce said that he was relieved it was over and that he regarded his time in jail as water under the bridge.
2690	613	It’s almost two years since it happened and a lot of water has gone under the bridge. We’re now on speaking terms with Marcia.
2691	613	We had a terrible quarrel five years ago but that’s all water under the bridge.
2692	613	All that is now just water under the bridge.
2693	614	As manager of this branch, you are responsible for firing employees who breach company regulations. Shit or get off the pot!
2694	614	You’ve been going back and forth between the same two models of car for the last two hours—either shit or get off the pot!
2695	614	Time to shit or get off the pot, ain’t it, Bud?
2696	614	There is little point in the advertisers threatening the networks any more. The time has come to piss or get off the pot.
2697	614	Hurry up with it, Fred! Shit or get off the pot!
2698	615	Though this is indeed an exciting discovery toward curing cancer, we have stood on the shoulders of giants to reach this point today.
2699	615	If I have been able to make any kind of success in this field, it is only because I have been carried on the shoulders of giants who paved the way ahead of me.
2700	616	The company pulled out all the stops for the CEO’s retirement party.
2701	616	The senator is going to have to pull out all of the stops if he’s to have any chance of winning this election.
2702	616	What a fabulous party, Mary—you really pulled out all the stops!
2703	616	They pulled out all the stops to win the contract.
2704	616	I pulled out all the stops to finish on time.
2705	616	She pulled out the stops to beat her opponent.
2706	616	Pimlott’s excellent new production pulls out all the theatrical stops.
2707	616	We’ll have to pull out all the stops to get this order ready by the end of the week.
2708	616	Don’t pull out all the stops in the first round. Wait till he’s tired in the third and clobber him good.
2709	616	The Inaugural Committee pulled out all the stops when arranging the ceremonies.
2710	617	My brother is the star athlete of our high school, so no matter what I succeed in, he’s constantly stealing my thunder.
2711	617	We were about to announce our engagement when Jeff and Tina stole our thunder and revealed that they were going to have a baby.
2712	617	We had the idea for "digital paper" years ago, but I see they’ve stolen our thunder and have their own version of it on the market.
2713	617	What do you mean by coming in here and stealing my thunder? I’m in charge here! someone stole my thunder by leaking my announcement to the press.
2714	617	It’s too late for rivals to take advantage. They couldn’t steal our thunder.
2715	617	I think O’Connor will steal some of the thunder from Read, as his book is out first.
2716	617	He had planned to tell everyone about his discovery at the September meeting, but his assistant stole his thunder by talking about it beforehand.
2717	618	The forced, tight-lipped smile of pity is another way of saying, "I’m washing my hands of this situation".
2718	618	For me, liberating myself from this Palme d’Or is a way of washing my hands of this sorry affair.
2719	618	He (Parks) is set to retire, so he washed his hands of this and doesn’t care.
2720	618	David has washed his hands of Tracy by this point, and he’s lost the plot a bit and jumped into bed with Maya as a reaction to something that’s happened between them.
2721	619	I don’t have enough money to go on a vacation right now; I’m afraid it would break the bank.
2722	619	Here are my favorite discount options that won’t break the bank.
2723	619	Can I get an apartment anywhere in this town without breaking the bank?
2724	619	It will hardly break the bank if we go out to dinner just once.
2725	619	Buying a new dress at a discount price won’t break the bank.
2726	620	John: "Hey everyone, sorry I’m late!" Dave: "Well, speak of the devil, and he shall appear! We were just talking about something funny you said the other day."
2727	621	When he started asking too many questions of his neighbors about their whereabouts during the weekend, they warned him that curiosity killed the cat.
2728	621	When Jane asked George where he was going at the middle of the night, he replied that curiosity killed the cat.
2729	621	Joe was very curious about where Sarah was getting all her money from, but all she said was that curiosity killed the cat.
2730	621	He refused to answer any of our questions regarding where he spent his vacation, saying instead “curiosity killed the cat”.
2731	621	Though he knew all about the matter, he refused to divulge it to anyone, only saying that curiosity killed the cat.
2732	621	"Where are you going all of a sudden?"he asked. "Curiosity killed the cat" she replied.
2733	622	Come on, Stan, wake up and smell the coffee! They’re cheating you out of millions!
2734	622	Things have changed around here, Wallace J. Hodder! Wake up and smell the coffee!
2735	622	You’ll have to wake up and smell the coffee. The world is a very hard, cruel place.
2736	622	It would really serve you well to wake up and smell the damned coffee and quit acting like a teenager.
2737	622	It’s time to wake up and smell the coffee: you’re not going to pass this course unless you start working harder.
2738	623	Many people lament the ubiquity and pervasive nature of social media, but there’s no way to put the toothpaste back in the tube, unfortunately.
2739	623	There’s no way to put the toothpaste back in the tube once a bombshell like this gets out. We just have to resign ourselves to the fact that the company will be in chaos for a while.
2740	624	A good presentation should contain more of graphics and less of text, since a picture is worth a thousand words.
2741	624	In order to effectively convey the health hazards of smoking, a cigarette pack now contains a picture of diseased lungs, instead of just the statutory warning message. A picture is worth a thousand words.
2742	624	The newspaper report carried more pictures of the event than text, since a picture is worth a thousand words.
2743	624	Its easier to learn how a machine works from pictures rather than descriptions, since a picture is worth a thousand words.
2744	624	It would be better if you drew out a map with the direction to the place rather than just telling me. A picture is worth a thousand words.
2745	624	Jane’s reaction in the picture is so weird about her boss—someone truly said that a picture paints a thousand words.
2746	624	Such a beautiful portrait of a little girl—represents how a picture paints a thousand words.
2747	625	You’re doing God’s work with these abused dogs—they are positively thriving in your loving care.
2748	625	Feeding the poor is God’s work, that’s why we go volunteer in the soup kitchen every week.
2749	625	A: "My company designs ad-blocking software for PCs and mobile phones." B: "Ah, doing God’s work, I see."
2750	626	A: "I know I made a mistake, but that happened years ago! Why are we still talking about it?" B: "Because old sins cast a long shadow." 
2751	626	The trouble you get into as a teen can cast a long shadow into your adult years.o
2752	626	I can’t believe you were irresponsible enough to get arrested with your friends. Stuff like this casts a long shadow, you know.
2753	627	Too much information will overwhelm the new intern, so just give him the meat-and-potatoes introduction.
2754	627	The meat-and-potatoes argument is that the law will unfairly target lower-class workers.
2755	627	Too much information will overwhelm the new hire, so just give him the meat and potatoes.
2756	627	The meat and potatoes of this game is keeping possession of the ball.
2757	627	American workwear is the meat and potatoes of off-duty clothing.
2758	627	The real meat and potatoes of any auto show is in the cars and trucks people can buy now.
2759	627	Mainstream rock acts like Van Halen and Bruce Springsteen are the meat and potatoes of A.O.R.
2760	628	Some people are never going to agree with you on this, so it’s no use beating your head against a wall trying to convince everyone.
2761	628	I feel like I’ve been beating my head against the wall trying to understand this math equation.
2762	628	I’m beating my head against the wall trying to get funding for my project. So far, I’ve made only $20.
2763	628	You’re wasting your time trying to figure this puzzle out. You’re just beating your head against the wall.
2764	628	You’re banging your head against a brick wall trying to get that dog to behave properly.
2765	629	It was a very sensitive case and yet for over one year the investigators kept barking up the wrong tree.
2766	629	If you think you will solve the problem by following those steps, you are barking up the wrong tree.
2767	629	I am not the person who spread those rumours about you, you are barking up the wrong tree.
2768	629	I had kept telling you all along that you are barking up the wrong tree, yet you did not pay any heed and continued doing it.
2769	629	I think they are barking up the wrong tree by focusing on the problems they have. They should focus on the solutions instead.
2770	629	Now I realize what a con artist he was! All along he was misleading us and we were all barking up the wrong tree.
2771	629	The police were barking up the wrong tree by trying to prove that person guilty. He was no where near the crime scene.
2772	630	The hate group makes a point of holding protests outside churches and the funerals of slain soldiers, even though they know their words are likely falling on deaf ears.
2773	630	Tragedy could have been prevented if the warnings hadn’t fallen on deaf ears.
2774	630	It doesn’t matter how convincing you think your pitch is if it falls on deaf ears.
2775	630	Her pleas for mercy fell on deaf ears; the judge gave her the maximum sentence.
2776	630	All of Sally’s good advice fell on deaf ears. Walter had made up his own mind.
2777	630	Sadly, this appeal is likely to fall on deaf ears.
2778	630	The mayor spoke privately to Gibbs yesterday and asked him to resign, but his plea fell on deaf ears.
2779	630	Sit Down and Listen All efforts by her husband to dissuade her from wishing to leave fell on deaf ears.
2780	630	Our request for money fell on deaf ears.
2781	630	"Moscow’s own familiar charges ... will also fall on deaf ears"
2782	631	I know you don’t like to accept the closed-door deals that go on in politics, but this is how the sausage gets made!
2783	631	Nearly everyone in the country has a smartphone, totally oblivious to the dire effects their production has on the planet and on the lives of workers who assemble them. But, as ever, people don’t want to know how the sausage gets made.
2784	632	The company’s newest device is, in fact, a complete waste of money, but so many people are invested in their brand loyalty that they will continue to buy and adore it like the emperor’s new clothes.
2785	632	Soon, investors will realize that the emperor has no clothes and there will be a big sell-off in stocks.
2786	633	Now that we’re out of pre-production, the film is really kicking into high gear.
2787	633	The city is kicking into high gear in its preparations for the anniversary parade.
2788	633	I’m going to meet with my team on Saturday so we can kick this project into high gear.
2789	634	Customers always want to shoot the shit with me in the store before they buy something.
2790	634	I just shot the shit with John for a while when he passed me on the street.
2791	635	Why is Katherine being so nice to me all of a sudden? I’m telling you, something is rotten in the state of Denmark.
2792	635	"Something’s rotten in Denmark," the detective muttered as he looked through the surveillance photos.
2793	635	Jim: Look, there’s a light on in the office, even though it’s way past the time everyone should have left. John: Something is rotten in the state of Denmark. Jane: I wonder why Fred is coming in so late every morning. Jane: Something is rotten in Denmark.
2794	636	When the rally was interrupted by protesters, the senatorial candidate made a quick exit stage left to avoid undue media attention.
2795	636	Governor Peters, you can’t just make an exit stage left—your constituents demand answers!
2796	636	We need to make an exit stage left before these reporters see us and start asking us questions.
2797	636	The CEO decided to exit stage left from the company before his embezzlements became too noticeable.
2798	636	I suggest you exit stage left before I lose my temper.
2799	636	We need to exit stage left before these reporters see us and start asking us questions.
2800	637	A: "Have you asked your boss for a raise yet?" B: "Not yet. There’s just been so much going on at work at the moment, so I’m waiting for the dust to settle first."
2801	637	There’s a lot of police activity around here lately. We should wait for the dust to settle before we start dealing again.
2802	637	The product has only been on the market for a couple weeks. Let’s wait for the dust to settle before we start making assumptions about its performance.
2803	638	It is a common tactic of despotic governments to throw dust in our eyes with fear and incitements to hatred in order to keep us from questioning their consolidation of power.
2804	639	His Achilles heel was that he could not delegate.
2805	640	No matter how confident the cheer-leading group is in carrying out the human pyramid gig, the team is only as strong as its weakest link.
2806	640	The people who live in that house together are united but they are only as strong as their weakest link that is the youngest son. He will not be able to uphold the strong values that the others so smoothly take care of.
2807	641	Yeah, he’s brilliant, but his violent temper has destroyed many business relationships—it’s a real chink in his armor.
2808	641	The criminal’s tendency to use his own cell phone to conduct business was the chink in the armor the police needed to put him in jail.
2809	641	A: "Why didn’t George get the promotion?" B: Probably because he’s such a hothead." A: "Good point. That really is a chink in his armor."
2810	641	Jane’s insecurity is the chink in her armor.
2811	641	The boss seems mean, but the chink in his armor is that he is easily flattered.
2812	641	With their superior knowledge, they might find the chinks in his armour.
2813	641	Labour leaders hope to use their annual conference to attack what they currently see as the most vulnerable chink in the government’s armour.
2814	641	The one chink in her armour is the lack of a sense of humour. She hates people laughing at her.
2815	642	Scientists will never fully understand the evolution of man until they find the missing link.
2816	642	Participation is the missing link in your grade, so I would suggest speaking up in class going forward.
2817	642	I think that chlorine is the missing link in this experiment.
2818	643	You need to change gear if you’re going get the car up that steep hill.
2819	643	Hey, if you’re gonna drive that slow, it’s a good idea to change gear.
2820	643	I changed gear before I began biking downhill.
2821	643	Once our proposal gets approved, we can change gear and focus on the next phase of the project.
2822	643	About halfway into the story, the book changes gears and begins a narrative from the perspective of the antagonist.
2823	643	With that out of the way, let’s change gears and discuss our strategy for the third quarter.
2824	644	A: "The patient’s irregular heartbeat could indicate Brugada syndrome." B: "Steady on, now—when you hear hoofbeats, think horses, not zebras. It’s probably just a supraventricular tachycardia caused by excess stress."
2825	645	I think I’m in over my head with Amy. She wants marriage, kids, and a house, and I’m just not ready for any of that.
2826	645	I’ve gotten in way over my head with this money laundering scheme—now the mob is threatening my family if I try to back out!
2827	645	He realized that he was in over his head, and that only his family could help him.
2828	645	Kelly told the hearing he got in way over his head and became afraid after the prisoner threatened him and his family.
2829	645	After a week in the new job, I soon realized that I was in over my head.
2830	646	I know you are broken up about Janet leaving you, but there are plenty of fish in the sea.
2831	646	I’m pretty disappointed that I didn’t get the job, but I’m trying to remind myself that there are plenty of other fish in the sea.
2832	646	When John broke up with Ann, I told her not to worry. There are plenty of other fish in the sea. It’s too bad that your secretary quit, but there are plenty of other fish in the sea.
2833	647	We had to walk about 30 miles after our car broke down, and my dogs are barking now!
2834	647	My dogs are really barking after all that dancing!
2835	647	Can we sit down and rest for a bit? My dogs are really barking.
2836	648	Let’s make it rain at the club tonight, fellas!
2837	649	Fans who have been demanding a sequel for the last decade had better put their money where their mouth is and go buy a ticket!
2838	649	He promised to lower taxes if he got elected. Now let’s see if he’ll put his money where his mouth is.
2839	649	If the minister is so keen on the school he should put his money where his mouth is and give us more resources.
2840	649	Musicians can also put their money where their mouths are and play benefit gigs.
2841	649	It seems reasonable to ask the public to put its money where its interests are.
2842	649	The government talks about helping disabled people, but doesn’t put its money where its mouth is.
2843	649	You think she’ll win? Come on, then, put your money where your mouth is (= have a bet with me).
2844	650	My parents bought my a car for my birthday! I can’t wait to take it out on its maiden voyage.
2845	650	The Queen attended the maiden voyage of the new Royal Navy Aircraft Carrier.
2846	650	This is the quarterback’s maiden voyage in the Super Bowl.
2847	650	The liner sank on its maiden voyage.
2848	650	Jim is taking his yacht on its maiden voyage.
2849	651	I was certainly nervous to start playing again after such a bad injury, but no guts, no glory, right?
2850	652	With only one hit song, it was obvious that the young pop star was going to be just another flash in the pan.
2851	652	The new startup created a lot of buzz, but it ended up being just another flash in the pan, out of business after just two years.
2852	652	That player is starting to seem like a flash in the pan. Will he ever repeat the success of his stellar rookie season?
2853	652	I’m afraid that my success as a painter was just a flash in the pan.
2854	652	Tom had hoped to be a major film star, but his career was only a flash in the pan.
2855	652	In the days following Beckon’s victory, the British establishment has gone out of its way to try and dismiss the result as a flash in the pan.
2856	652	Hopefully now I’ll be taken seriously, I’m not a flash in the pan.
2857	652	Hers is no flash-in-the-pan talent, but a major and mature new voice.
2858	652	But Java...may turn out to be flash in the pan: books on human-computer interaction struggle to stay abreast of rapid developments in computing.
2859	652	He scored a lot of goals early in the season, but hasn’t scored any since, so it may have been just a flash in the pan.
2860	654	The manager will really leave me in the lurch if he decides to quit before this project is finished.
2861	654	When Janet’s husband decided to go on a weekend getaway with his friends, he left her in the lurch organizing her kid’s birthday party.
2862	654	Where were you, John? You really left me in the lurch.
2863	654	I didn’t mean to leave you in the lurch. I thought we had canceled our meeting.
2864	654	My secretary left me in the lurch last month and I haven’t found a replacement yet.
2865	654	The airline has shut down, leaving thousands of ticket holders in the lurch.
2866	654	What have Gilmores ever done but leave her in the lurch? Poor Jane, she just can’t run the risk of being hurt again.
2867	654	You can’t resign now and leave us all in the lurch. It wouldn’t be fair.
2868	655	We get some pretty bad storms around here, but the levee has always left us high and dry, thank goodness.
2869	655	You really left me high and dry when you forgot to pick me up last night. I had no way of calling or getting home!
2870	655	The departure of several key employees has left the business high and dry.
2871	655	While the riot was going on down on the streets, I was high and dry in my apartment.
2872	655	Liz came out of the argument high and dry.
2873	655	Angela’s Ashes I hear he left you high and dry, eh? I don’t know how a man in his right mind can go off and leave a wife and family to starve and shiver in a Limerick winter.
2874	655	When the travel company went bankrupt, many holidaymakers were left high and dry abroad or waiting at the airport.
2875	655	Here I sit high and dry—no food, no money, no nothing.
2876	655	went off and left me high and dry.
2877	656	I don’t usually have time to read news articles all the way to the end, so it really annoys me when they bury the lead.
2878	656	Come on, you’ve got to get to the point. You’ll never make it as a reporter if you always bury the lede like this.
2879	656	Thank you for laying out your argument right from the beginning, rather than burying the lead.
2880	657	The sky’s the limit for our talented graduates!
2881	657	He proudly proclaims that today in Russia the sky is the limit to what a person can earn.
2882	658	Thanks to the economy doing so well lately, our business has been booming. I guess it’s really true what they say, that a rising tide lifts all boats.
2883	658	If prices for single-family homes are rising in our neighborhood, then we should be able to fetch a good price for our twin. A rising tide lifts all boats, after all.
2884	658	If they sold their app for a billion dollars, it’s certainly not a bad thing for other tech companies—you know, a rising tide lifts all boats.
2885	659	She has never had to work a day in her life. Her parents hand her everything on a silver platter.
2886	659	He is so good looking that he gets everything on a silver platter.
2887	659	I can’t believe that you didn’t finish the project. I handed you the information on a silver platter.
2888	659	My boss is coming over for dinner tonight. I will have to present all of the food on a silver platter.
2889	659	My plates aren’t good enough for my mother in law. She wants everything served on a silver platter.
2890	660	We may both be wealthy now, but I never had a silver spoon growing up. I had nothing when I was young, and all of my fortune is down to my own hard work.
2891	660	Everyone who attends that university was born with a silver spoon in his mouth, so I just don’t think it’s the right place for me.
2892	661	My great-great-grandparents emigrated to America in 1888, believing as so many did that the streets were paved with gold.
2893	662	More than anything else, it’s the pillow talk that I miss most since we had kids—we just don’t have the time for it anymore, and it feels like we’ve become a bit distant as a result.
2894	662	"He said he’d never been so deeply in love in the whole of his life." "That was just pillow talk."
2895	662	"How did he find out about that?" "Pillow talk, probably."
2896	663	I think it will be easier to become comfortable driving now that I’ve gotten the ball rolling with driving lessons.
2897	663	I’ll get the ball rolling with the icing while you mix the batter.
2898	663	We have so much to do around the house today, ugh. Can you get the ball rolling with the laundry?
2899	663	If I could just get the ball rolling, then other people would help.
2900	663	Who else would start the ball rolling?
2901	663	I had the ball rolling, but no one helped me with the project.
2902	663	I will start the ball rolling by introducing the first speaker.
2903	664	I’m really tired of your constant criticisms. Why don’t you take a long walk off a short pier?
2904	665	Don’t get all bent out of shape—I’m sure she didn’t mean to insult you.
2905	665	You should apologize to Phil before he gets bent out of shape.
2906	665	Oh, Trish is always bent out of shape about one thing or another. I try to ignore her myself.
2907	665	Ever since the car accident, my passenger-side door has been bent out of shape.
2908	665	Mom, would you just buy a new frame already? This one’s pretty bent out of shape after 20 years.
2909	665	What happened to the gutter in the back of the house? Why is it all bent out of shape?
2910	665	The cheating that was going on really bent Joe out of shape.
2911	665	Why do you let yourself get bent out of shape? Chill, man, chill.
2912	665	Jill bent the spring out of shape.
2913	665	I bent the coat hanger out of shape by hanging my leather jacket on it.
2914	665	Man, there is no reason to get so bent out of shape. I didn’t mean any harm.
2915	665	I got bent out of shape because of the way I was treated.
2916	665	I was so bent out of shape I thought I’d never recover.
2917	665	I’ve been polluted, but never as bent out of shape as this.
2918	665	People get bent out of shape if you don’t pronounce their names right.
2919	665	The disease is on the rise and everybody’s all bent out of shape about it.
2920	665	Fancy Max Corigliano was there...and bent out of shape about having been made to wait so long.
2921	666	You just need to accept that your daughter is going to rule the roost for most of her childhood.
2922	666	For all intents and purposes, it’s the assistant manager who rules the roost.
2923	666	Who rules the roost at your house? Our new office manager really rules the roost.
2924	666	In Germany, scientists will be found at the top of many manufacturing companies; in Britain, accountants rule the roost.
2925	666	Unfortunately he’s a weak manager who lets the players rule the roost when he’s meant to be in charge.
2926	666	Today, the cartels still rule the roost and the authorities seem as impotent as ever.
2927	666	It is a family firm, where the owner’s mother rules the roost.
2928	666	In this house my parents rule the roost.
2929	668	I thought Allison and I had a strong friendship, but I learned she was just another fair-weather friend when she stopped talking to me after my divorce.
2930	668	She doesn’t accept any fair-weather friends because she expects full support in good times and in bad.
2931	668	So you’re not talking to me now either? Wow, I never took you for a fair-weather friend.
2932	668	Bill stayed for lunch but he wouldn’t help me with the yard work. He’s just a fair-weather friend.
2933	668	A fair-weather friend isn’t much help in an emergency.
2934	668	The Americans gave up supplying gold on demand to other countries’ central banks at £35 an ounce...when their fair-weather friends from London threatened to turn up and clean them out.
2935	668	I really thought she’d be here to help me, but it seems that she’s just a fair-weather friend.
2936	669	Henry jumped the gun and sent the proofs to the printer before the boss approved them, and she was not happy.
2937	669	I probably jumped the gun with announcing our engagement before everyone was there, but I was just too excited.
2938	669	We all had to start the race again because Jane jumped the gun.
2939	669	When we took the test, Tom jumped the gun and started early.
2940	669	"How about going out to celebrate?" — "I haven’t definitely got the job yet so let’s not jump the gun."
2941	669	The book wasn’t due to be released until September 10 but some booksellers have jumped the gun and decided to sell it early.
2942	669	They jumped the gun by building the garage before they got permission from the town council.
2943	669	The secretary jumped the gun and gave out the letters too soon.
2944	670	I know there’s a lot to take in, but your partner has been here for over 10 years and will show you the ropes.
2945	670	This class is intense! You’re expected to know how to do everything from day one without anyone showing you the ropes.
2946	670	Jake will take you around and show you the ropes.
2947	670	He promised to work overtime teaching Brown the ropes.
2948	671	Once I get some proper food under my belt, I’ll be ready to tackle any work you can throw at me!
2949	671	My father could become quite nasty whenever he got a bit of booze under his belt. That’s why he gave up drinking.
2950	671	He should be less cranky after he gets some food under his belt.
2951	671	The legendary batter had gotten more than 2000 runs under his belt by the time he retired.
2952	671	As a pilot in training, it’s always a relief to get your first real landing under your belt.
2953	671	Once you get a few more major league games under your belt, you’ll feel more comfortable.
2954	671	Once he got the proper technique under his belt, Jacques had no problem finishing the project on his own.
2955	671	I know I’ll be fine on my own soon enough, I just need to get the basics under my belt.
2956	671	You need to get equations like this under your belt before you can move on to harder ones.
2957	672	Of course I shit a brick when I woke up to the sounds of an intruder in my house!
2958	672	My brother is so strong and scary-looking that people shit bricks when he threatens them.
2959	672	I was so mad, I almost shit a brick!
2960	673	Look boys, this air raid needs to be done fast and efficiently; fly in balls to the wall, hit the targets, and get the heck out of there.
2961	673	We’re gonna have to go balls to the wall on offense today if we want to have any hope of beating this team.
2962	673	Hey, just because you have your driver’s license now doesn’t mean you have to go balls to the wall! Slow down!
2963	674	When you get a chance, check out the magazine’s deep dive on the upcoming vote. It covers every angle.
2964	674	Wow, they really did a deep dive on eye shadow in that article. It was 20 pages long!
2965	674	I did a deep dive on the file mix-up, and I found some very interesting, maybe even nefarious, things.
2966	675	A: "You never do any chores around the house, you just leave them for the rest of us!" B: "Oh, go kick rocks, Charles! I’m sick of listening to your crap."
2967	675	I can’t believe you told your teacher to kick rocks after she yelled at you.
2968	676	When I found out he had been reading through my text messages, well, that took the cake!
2969	676	You charged me for the drink you spilled on me? That really takes the cake!
2970	676	You’ve done some nice murals, but this one takes the cake!
2971	676	When I found out he had been reading through my text messages, well, that took the cake! I dumped him right then and there.
2972	676	You’re charged me for the drink you spilled on me? That really takes the cake!
2973	676	I mean, he’s done a lot of crazy things, but this really takes the cake.
2974	677	Wrap it up, Bob, you’ve been talking for nearly half an hour already.
2975	677	We’re running short on time, so I’m afraid we’ll have to start wrapping it up.
2976	677	OK, you two in the back, wrap it up! I’d like to finish my lesson without you distracting me.
2977	677	You’re putting yourself at risk if you don’t wrap it up every time.
2978	677	Don’t forget to wrap up Dan’s present before you go to the party.
2979	677	You go on ahead, I just need to wrap up some work before I head home.
2980	677	OK, everyone, let’s wrap it up for tonight.
2981	678	Oh, you know I never normally make requests like this. Cut me some slack.
2982	678	A: "I can’t believe she talked to me like that!" B: "You need to cut her some slack—she’s grieving right now."
2983	678	Cut Tom some slack. He studied hard for that test, but it’s just not his best subject.
2984	678	When you’re new at a job, colleagues and bosses cut you some slack. They forgive minor mistakes because you’re new.
2985	678	She’s still upset about her dad. Cut her a little slack.
2986	678	Most, though, are willing to cut Spielberg some slack for the sake of cinematic interpretation.
2987	679	The company has been trying to distance itself from the outspoken director before he says something horribly offensive and the shit really hits the fan.
2988	679	I know you think your job is secure, but you should always be prepared in case shit ever hits the fan.
2989	679	He seems qualified on paper, but how do you think he’ll perform under pressure when the shit hits the fan?
2990	679	When the shit hits the fan, you had better be prepared to support those of us who are involved in this mess.
2991	679	If I was them, I’d be planning to pull out before the shit hits the fan.
2992	679	Then Gene heard about the matter and the shit really hit the fan.
2993	679	Tom visited us in Canada shortly before the stuff hit the fan.
2994	679	When the committee finds out what actually happened, the shit will really hit the fan.
2995	679	We had one hell of an afternoon around here. Where were you when the shit hit the fan?
2996	680	They say there’s nothing new under the sun.
2997	680	I looked everywhere under the sun for you! Where have you been?
2998	680	This is the largest cattle ranch under the sun.
2999	680	Isn’t there anyone under the sun who can help me with this problem?
3000	680	He’s tried every medicine under the sun, but nothing works.
3001	680	I’ve got stamps from every country under the sun.
3002	681	I’ll be on the gravy train once I get paid from the settlement of the lawsuit!
3003	681	My brother ended up on the gravy train when he married his wife, whose family owns one of the largest oil companies in the world.
3004	681	Financial services produce very high earnings, and a lot of people are trying to get onto the gravy train.
3005	681	This kind of job is a real gravy train.
3006	682	So it’s certainly fair to say your piece to him once, out loud, clearly, then listen to his answer, then use it to decide whether his clothes are the hill you want to die on.
3007	682	If you have a supportive and doting partner, is this really the hill you want to die on while quibbling over semantics?x
3008	682	Cautionary note to Democrats and the media: The golf simulator that President Trump installed in the White House to replace the less sophisticated one President Obama installed in the White House is not the hill you want to die on.
3009	682	Things change, society evolves, and you want to get hung up on a word that hurts people’s feelings—that’s the hill you want to die on?
3010	683	Come on, Jim, this is a party! Let your hair down and go a little wild!
3011	683	It is only with friends that most people feel they can let their hair down and be themselves.
3012	683	He enjoyed all the jokes, but you got the impression he couldn’t really let his hair down.
3013	683	Why don’t you let your hair down a bit? Come out with us for the evening.
3014	684	I’m worried that I’m going to get a ton of work dumped on me when my boss decides to hang up her hat.
3015	684	You’re getting too old for this job, Thompson. I think it’s time to hang up your hat.
3016	685	I can’t believe that after 20 years of hard work the company would just kick me to the curb like that!
3017	685	I think it’s about time we kick this old computer to the curb.
3018	685	I heard Jenny kicked her boyfriend to the curb last night. They must have had an awful fight!
3019	686	I know we’ve had our differences, but I’d like to repair our friendship. Can we start over with a clean slate?
3020	686	I really appreciate you giving me a clean slate after I failed that first test.
3021	686	The guy has cheated on you multiple times! Stop giving him a clean slate!
3022	686	At the new school, you will start with a clean slate.
3023	686	They kept a clean sheet in the match (= no goals were scored against them).
3024	687	I was on top of the world when I found out that I’d gotten an A on my hardest exam.
3025	687	Cathy has been on top of the world ever since she got that big promotion at work.
3026	687	Wow, I feel on top of the world. Since he got a new job, he’s on top of the world.
3027	687	Wow, I feel on top of the world.
3028	687	Since he got a new job, he’s on top of the world.
3029	687	The combination of cold, crisp snow and warm sunshine makes you feel on top of the world.
3030	687	When she came back from that holiday she was so happy, on top of the world.
3031	687	I’m on top of the world; I’ve just had a baby son.
3032	687	You’ll feel on top of the world after a good rest.
3033	688	Be careful—one slip of that knife and you’ll cut yourself to the quick.
3034	688	I guess he didn’t cut himself to the quick after all—the doctor says he doesn’t need stitches.
3035	688	Hey, get away from there—that saw could cut you to the quick!
3036	688	I can’t even look at her right now—that hurtful remark cut me right to the quick.
3037	688	Even though the comments cut me to the quick, I remained composed and carried on with the lecture.
3038	688	Do not question her ability to parent—that will definitely cut her to the quick.
3039	688	With the very sharp knife, David cut the beast to the quick in one blow.
3040	688	He cut his finger to the quick with the sharp knife.
3041	688	Your heartless comments cut me to the quick.
3042	688	Her remarks cut him to the bone.
3043	688	The cruelty of their words cut me to the quick.
3044	688	That tone of hers always cut him to the quick.
3045	688	It cut her to the quick to hear him criticizing her family like that.
3046	689	We don’t have any concrete data yet. The numbers we do have are nothing to hang our hats on.
3047	689	Yes, you had a great season, but that’s nothing to hang your hat on. You need to keep improving if you want to make the team again next year.
3048	689	In this industry, a steady income is nothing to hang your hat on. Jobs dry up all the time.
3049	689	A: "The company put out a statement explaining what happened." B: "Eh, that’s just standard PR spin. It’s nothing to hang your hat on."
3050	689	Melissa has been known to exaggerate, so her story is nothing to hang your hat on. We need to get Annie’s side of the story.
3051	689	A: "I’ve heard he’s a shady character." B: "Oh yeah, his version of events is nothing to hang your hat on."
3052	689	I know we’re all pleased with the result of the marketing campaign, but a one-percent increase in sales is really nothing to hang your hat on. We’ll need to do a lot better next quarter if we want the boss off our backs.
3053	689	An attention-getting campaign is nothing to hang your hat on if you don’t win the election.
3054	689	Yeah, winning a hundred bucks at the casino is nothing to hang your hat on when you’ve already blown $1,000 on the slot machines!
3055	690	I hear that the only reason Johnny got into college was because his dad pulled some strings with the president of the university.
3056	690	I actually know a few people who work at the restaurant, so I’ll see if I can pull a few strings and get you a table.
3057	690	You wait and see, he’s going to start pulling strings to get this police investigation quashed.
3058	690	I can get it done easily by pulling a few strings.
3059	690	Is it possible to get anything done around here without pulling some strings?
3060	690	It was felt that her father was pulling strings to advance her career.
3061	690	She knows a lot of people in the theatre so she’s usually able to pull a few strings if there are any tickets she wants.
3062	690	He got his job back, thanks to some string-pulling by a major Hollywood power player—who happens to be his girlfriend’s father.
3063	690	Behind the scenes, there is invariably a democratic government or two pulling strings to keep the cigarette barons in power.
3064	690	She doesn’t want me to pull any strings for her; she says she prefers to be offered a place on her own merit.
3065	690	I’m sure his uncle in the BBC must have pulled strings for him.
3066	691	I can’t believe we lost 17-1. Man, we really shit the bed tonight!
3067	692	The successful negotiation of the merger between the two companies was another notch on the young executive’s belt.
3068	692	It wasn’t a particularly difficult match, but the win is nevertheless a notch on the belt of the defending champion.
3069	692	You sold your first million-dollar house? Well, there’s a notch on your belt as a realtor!
3070	693	A: "Dude, why are you smashing rocks through the windows of this abandoned building?" B: "Eh, for shits and giggles."
3071	693	He’s the type of person who gets his shits and giggles by pissing people off for no reason.
3072	694	The two athletes have been neck and neck for this entire race.
3073	694	The election is neck and neck. We’re going to have to wait until the very last votes are tallied.
3074	694	John and Tom finished the race neck and neck.
3075	694	Mary and Ann were neck and neck in the spelling contest. Their scores were tied.
3076	694	The latest opinion polls show both parties running neck and neck.
3077	694	Leeds are currently neck-and-neck with Manchester United for the Championship.
3078	694	Polls suggest a neck-and-neck race between the Liberals and Conservatives.
3079	694	The Republicans had a 30-point lead over the Democrats; today, the Democrats are neck and neck on what’s supposed to be a bedrock conservative issue.
3080	694	With another 100 metres to go, Jones and Saville are neck and neck.
3081	694	The horses were neck and neck at the finish line.
3082	695	Sorry for the delay, folks. I think we’re ready to get this show on the road.
3083	695	It’s about time they got this show on the road!
3084	695	Is everyone here finally? Then let’s get this show on the road!
3085	696	Wow, George is such a talented piano player! The way he can play pieces by ear after hearing them just once is so impressive!
3086	696	Just because he can play by ear doesn’t mean he’s a great songwriter.
3087	696	A: "Are we meeting at noon on Saturday?" B: "Around then. I have to run some errands in the morning, so let’s play things by ear."
3088	696	I could tell he had forgotten his notes and was playing the presentation by ear.
3089	696	A: "Are we meeting at noon on Saturday?" B: "Around then. I have to run some errands in the morning, so let’s play it by ear."
3090	696	My apologies in advance, but I forgot my notes for today’s presentation, so I’m afraid I’m going to have to play it by ear a little bit.
3091	696	I can play "Stardust" by ear.
3092	696	Some people can play Chopin’s music by ear.
3093	696	John can play the piano by ear.
3094	696	If I could play by ear, I wouldn’t have to take lessons—or practice!
3095	696	If we go into the meeting unprepared, we’ll have to play everything by ear.
3096	696	He never prepared his presentations. He always played things by ear.
3097	696	"Where will we stay in Gloucestershire?" — "Oh, I guess a bed-and-breakfast place. We’ll have to play it by ear."
3098	696	I don’t know what will happen next. I’m playing it by ear.
3099	696	She can’t read music very well, so she plays all the tunes by ear.
3100	696	You can’t really prepare for the questions the interviewer will ask—you’ll just have to play it by ear, I’m afraid.
3101	696	I don’t have a set schedule, so we’ll have to play it by ear.
3102	697	I’m sorry but I just have to get something off my chest. How could you treat me like that last night?
3103	697	You’re clearly annoyed, so go on, get it off your chest—what’s bothering you?
3104	697	Wait, the holidays don’t solely exist for family members to get all their grievances off their chests? Could have fooled me!
3105	698	Stay in your lane, will you? I can take care of my problems just fine.
3106	698	I really wish she would stay in her lane and stop asking me about my finances.
3107	698	Excuse me, but do you have any actual experience working in this industry? No? Then stay in your lane and stop pretending like you know what you’re talking about.
3108	698	There are a lot of gatekeeping jerks in the video game scene that think you should just stay in your lane if you haven’t devoted your entire life to the hobby.
3109	699	He’s a very charming guy, but I wouldn’t put it past him to stab me in the back if it meant advancing his career.
3110	699	I should know by now not to put such vile treachery past the likes of him.
3111	699	My grandmother might be 85, but you still can’t put a thing past her!
3112	699	That sleazy used car salesman couldn’t put his bogus little scam past me.
3113	700	You want me to tell our plans to Jill? No, I don’t think so—I trust Jill about as far as I can throw her.
3114	700	The government is asking us to believe that they’ll apply the new tax fairly, but I trust them about as far as I can throw them.
3115	702	My younger brother is always pleading for me to help out his career, so I threw him a bone and got him a small gig.
3116	702	The government threw a bone to environmentalists by acknowledging the need for cleaner energy.
3117	702	Throw me a bone here! (= give me a little help)
3118	703	I invited you because I thought long-distance cycling was your cup of tea.
3119	703	When I found out that reading wasn’t his cup of tea, I knew that there wasn’t much of a relationship in store between us.
3120	703	A: "You’ve always been something of a homebody, though." B: "Oh yeah, staying in and relaxing is definitely my cup of tea."
3121	703	She did finish all of her chores, but her homework is another cup of tea altogether.
3122	703	I thought being pregnant was stressful enough on its own, but house-hunting while pregnant, that’s an entirely different cup of tea!
3123	703	I know you think you’re some hotshot just because you worked in television once, but working on a film is a another cup of tea entirely.
3124	704	OK, what happened at Blair’s party last night? Spill the tea!
3125	705	A good defensive player needs to be able to read the ball off the bat.
3126	705	With the way the ball jumped off the bat, the pitcher is lucky he didn’t get beaned in the head!
3127	705	Right off the bat, I could tell that the plan had no chance of success.
3128	705	Sarah’s parents took to her new girlfriend right off the bat.
3129	705	When he was learning to ride a bicycle, he fell on his head right off the bat. The new manager demanded new office furniture right off the bat.
3130	705	I learned right off the bat that you can’t rely on anything in this business.
3131	705	Right off the bat I had a problem that meant I had to stop work.
3132	705	They liked each other very much, right off the bat.
3133	705	They responded right off the bat.
3134	706	The caterer really pulled a rabbit out of a hat by producing 100 cupcakes with just 20 minutes’ notice.
3135	706	Unless someone can pull a rabbit out of a hat, we’re out of solutions.
3136	707	I know you feel like you know everything about philosophy now, but this introductory course only scratches the surface.
3137	707	Jack never felt satisfied devoting his time and attention to one thing, so instead he’s scratched the surface of a number of hobbies and interests.
3138	708	Don’t worry, if you use a warm, damp towel, the makeup will just rub right off.
3139	708	You’d better rub that paint off before it has a chance to dry!
3140	708	Peter’s been very unruly lately. I think the Thompsons’ little brat has been rubbing off on him.
3141	708	I want you to spend a month mentoring with Sarah here. Hopefully, some of her talent and work ethic will rub off.
3142	708	The waiter’s condescending remarks really rubbed me off wrong, you know?
3143	708	He has a knack for rubbing off his clients with his abrasive personality.
3144	708	Peter’s been very unruly lately. I think that new kid is rubbing off on him.
3145	708	It seems like your boss’s greed is rubbing off on you—is money all you care about now?
3146	708	The butler rubbed the tarnish off the pitcher. The butler rubbed off the dark tarnish.
3147	708	Alice rubbed suntan lotion onto her arms and legs. Rub on some of this lotion.
3148	708	I’ll sit by Ann. She has been lucky all evening. Maybe it’ll rub off on me. Sorry. I don’t think that luck rubs off.
3149	708	Look what rubbed off on me! The wet paint rubbed off onto my pants leg.
3150	708	The mechanic grabbed a rag and rubbed off the grease. Don’t scrub too hard, or you’ll rub the paint off the car.
3151	708	The ink on the table won’t rub off. The newsprint rubbed off on my fingers.
3152	708	We hope some of her enthusiasm rubs off. I’m glad to see their good manners have rubbed off on you.
3153	709	A; "Now your father thinks the neighbors are plotting against him." B: "Wow, he’s really gone off the deep end!"
3154	709	Whoa, man, stop yelling! I only put a tiny scratch on your car, so there’s no need to go off the deep end.
3155	710	Adam and Joe are going toe-to-toe out in the schoolyard! I almost got hit with a punch as I walked by!
3156	710	The literary magazine and the science club are going toe-to-toe for extra funding this year.
3157	711	They’re just about to close the gates! It looks like we made the flight by a hair.
3158	711	The race was neck and neck till the very end, but Sally won it by a hair.
3159	711	Hundreds of people avoided death by a hair when their apartment building caught on fire in the middle of the night.
3160	711	I just missed getting on the plane by a hair’s breadth.
3161	711	I made it onto the last flight by a hair!
3162	712	If everyone chips in to help, we can clean this garage in no time.
3163	712	How much am I supposed to chip in for our joint gift?
3164	712	Hey, if some of your interns chip in, we might just get this mailing out the door today after all!
3165	712	Hurry up and chip in something for this hand.
3166	712	Nah, I don’t want to chip in this time. I fold.
3167	712	Cal’s not a big bettor so I doubt he’ll chip in much for this hand.
3168	712	When I heard them discussing my department, I just had to chip in with my own suggestions.
3169	712	A: "Please, don’t all chip in at once." B: "I’m sorry, Dad, I just don’t think anyone is as excited about this as you are."
3170	712	We were in the middle of an intense discussion about the merits of the Socratic method, when Jeremy chipped in with some inane quote from the movie Bill and Ted.
3171	712	Would you like to chip in with a little cash on a gift for Carol?
3172	712	I will chip in a little with you on a gift for Carol.
3173	712	Would you chip in with a few bucks for a gift for Carol?
3174	712	Would you chip a few bucks in on a gift for Carol?
3175	712	Would you care to chip in on a gift for the teacher?
3176	712	Yes, I’d be happy to chip in.
3177	712	Could you chip in a dollar on the gift, please?
3178	712	Would you please chip in on the present for Richard?
3179	712	Will you chip in for Randy?
3180	712	They chipped a few bucks in for snacks. We all chipped in $5 for supplies. Everybody ought to chip in so that no one gets stuck with all of the costs.
3181	712	After each player chipped in $1, I dealt the cards. You’re not getting any cards until you chip in.
3182	712	I wanted to chip in, but I couldn’t get a word in edgewise. You can chip in any time.
3183	713	Building up an entertainment system from scratch sounds good, but buying the whole enchilada in one shot is much more convenient.
3184	713	If you sign up today, you can get the whole enchilada for just $2,000.
3185	713	Nobody, but nobody, ever gets the whole enchilada. Richard wants the whole enchilada.
3186	713	We should bomb them, send in the Marines—the whole enchilada.
3187	713	Consumers who want this software can download the whole enchilada from their website.
3188	713	High-tech gadgetry is best viewed as the spice, but not the whole enchilada.
3189	713	We had a great time on vacation, and it only cost us $500 for the whole enchilada.
3190	713	Pete wants the whole enchilada.
3191	714	I had a collection I’d been putting together for nearly 25 years, and burglars stole the whole kit and caboodle.
3192	714	John has some awesome camping gear, and he let us borrow the whole kit and caboodle for the weekend.
3193	714	When I bought Bob’s motorhome, I got furniture, refrigerator, and linen
3194	714	the whole kit and caboodle. The salesman managed to sell John the whole kit and caboodle.
3195	714	You can borrow the tent and equipment—the whole caboodle—if you like.
3196	714	They have financed the whole kit and caboodle.
3197	714	I had new clothes, a new hairstyle—the whole caboodle.
3198	715	I wouldn’t get too attached to Katie, she’s just Ralph’s flavor of the month—they’ll break up in no time.
3199	715	You change majors all the time, so it sounds like biology is just the latest flavor of the month!
3200	715	This new social media app is the flavor of the month for teenagers across the country.
3201	715	One minute you’re flavour of the month, top of the bestseller charts, and the next minute you’re forgotten.
3202	715	Filmstars seem to be interested in whatever cause is the latest flavour of the month.
3203	715	Monetarism was the flavour of the year.
3204	715	Suddenly, he was flavour of the moment on both sides of the Atlantic.
3205	715	If I were you, I’d keep quiet at the staff meeting. You’re not exactly flavour of the month with the boss at the moment.
3206	716	Charlie, I can’t believe you’re back in town! Get over here, you’re a sight for sore eyes!
3207	716	I’m so tired after being on tour. My bed is a sight for sore eyes.
3208	716	After all that rain, the sun sure is a sight for sore eyes!
3209	716	Oh, am I glad to see you here! You’re a sight for sore eyes. I’m sure hungry. This meal is a sight for sore eyes.
3210	716	The sunset over the Strait of Malacca is a sight for sore eyes.
3211	716	You’re a sight for sore eyes in your white dress, Milly!
3212	717	I’ve had this awful feeling in the pit of my stomach all morning because I know we’ll be finding out the results to the final exam this afternoon.
3213	718	I had a lump in my throat as I watched the casket of the fallen soldier return home.
3214	718	When Bob stood up to thank everyone at his retirement party, he got a lump in his throat and just had to nod and smile as he teared up.
3215	718	Whenever they play the national anthem, I get a lump in my throat.
3216	718	I have a lump in my throat because I’m frightened.
3217	718	Meg felt a lump in her throat. She was going to miss Dot.
3218	718	It brings a lump to my throat. We are so proud of her.
3219	719	Great job on that report, Jacobs—you really knocked it out of the park!
3220	719	I had expected to knock that test out of the ballpark, but I barely scraped by with a D.
3221	720	A: "Why is Carrie pacing?" B: "She’s waiting for the doctor to call with her test results, so she’s been on pins and needles all day."
3222	720	I’ve been on pins and needles all day, waiting for you to call with the news.
3223	720	We were on pins and needles until we heard that your plane had landed safely.
3224	720	We were approaching Cape Horn, where we had almost lost our lives two years ago, so I was definitely on pins and needles.
3225	720	I think we all have been sitting on pins and needles and anxious for something to happen.
3226	721	Instead of running around like a chicken with its head cut off, make a list of items you need to finish and then work on them in order.
3227	722	I used to think that being 40 meant you were over the hill, but I still feel as youthful as ever.
3228	722	The judges are always a bunch of washed-up, over-the-hill singers trying desperately to remain relevant.
3229	722	Two privates went over the hill last night. They broke out of jail and went over the hill.
3230	722	You’re only fifty! You’re not over-the-hillyet. Some people seem over-the-hill at thirty.
3231	722	It’s true some people regard you as over the hill at fifty.
3232	722	If you’re an interpreter you might be over the hill at the age of 35.
3233	722	The novel is about an over-the-hill, badly behaved spy.
3234	722	Some people think if you’re 30, you’re over the hill!
3235	722	Two privates went over the hill last night.
3236	722	You’re only fifty! You’re not over the hill yet.
3237	723	I thought I was going to fail the test, but it turned out to be a piece of cake!
3238	723	No problem. When you know what you’re doing, it’s a piece of cake. Glad to help. It was a piece of cake. Rescuing frightened cats is my specialty. Piece of cake!
3239	723	If it’s quiet, the job’s a piece of cake.
3240	723	Her family have 11 children, so looking after 4 will be a piece of cake for her.
3241	723	After climbing mountains in the Swiss Alps, going up English hills is a piece of cake.
3242	723	Taking photos should be a piece of cake with the new camera I’ve got.
3243	723	No problem. When you know what you’re doing, it’s a piece of cake.
3244	723	Rescuing drowning cats is my specialty. Piece of cake!
3245	724	Jeez, I’ll pay for the damage. Don’t have a cow!
3246	724	My mother will have a cow if we get a stain on the new sofa.
3247	724	He’ll have a cow if he ever finds out!
3248	724	"Don’t have a cow",she said huffily. "It’s no big deal."
3249	724	My dad spent $500 on a new coat and my mom had a cow.
3250	724	He had a cow when he saw the mess we made.
3251	725	The bouncer wasn’t letting anyone in, even though there was plenty of space inside, so we all decided to bum rush him.
3252	725	Everyone bum rushed the stage after the amazing concert.
3253	725	If this huge crowd bum rushes the gates, people are going to get seriously hurt, maybe even killed.
3254	726	The desserts in this restaurant are to die for!
3255	726	The cabin was built above the lake, and it has a view to die for.
3256	726	This chocolate cake is to die for!
3257	726	We had a beautiful room at the hotel and the service was to die for.
3258	726	The food is to die for, it’s heaven on a plate.
3259	726	She’s a stunning girl with a figure to die for.
3260	726	Farther down the street is Tutti’s, an Italian deli-restaurant that serves up...hazelnut torte to die for.
3261	726	She was wearing a dress to die for.
3262	727	The spy fled when he realized that someone had blown his cover.
3263	727	I totally blew my cover when I stupidly wore my school jacket to steal the other team’s mascot.
3264	727	Agent 165, you need to come home at once. Now that they’ve blown your cover, you’re no longer safe in that country.
3265	727	The dog recognized me and blew my cover.
3266	727	I didn’t mean to blow your cover by calling out to you.
3267	727	Asking those kind of questions could blow my cover.
3268	727	The young man looked embarrassed, as if he were a spy whose cover had been blown.
3269	727	She had been posing as a diplomat, but her cover was blown when she was found sending coded messages to agents.
3270	729	Double check your code—with software, the devil is in the details.
3271	729	In any negotiation, the devil is in the detail.
3272	730	My grandmother is always adamant that we wash our hands before every meal because cleanliness is next to godliness.
3273	730	If your girlfriend thinks cleanliness is next to godliness, how on earth is she going to cohabitate with a slob like you?
3274	730	You could have eaten off of Aunt Betty’s floors. Her favorite saying, not surprisingly, was "cleanliness is next to godliness."
3275	730	Child: How come I have to take a bath? Mother: Cleanliness is next to godliness.
3276	730	The woman sitting next to me on the bus had obviously never heard that cleanliness is next to godliness.
3277	733	Before you go popping a girl’s cherry, you had better make damn sure that you’re both totally ready to sleep with each other.
3278	733	There is nothing wrong with waiting until you’re absolutely ready before you pop your cherry. Too many people try to pressure you into it from too young an age.
3279	733	Somebody pass Marcus the joint, he still needs to pop his cherry tonight!
3280	733	For her birthday, I bought my friend Samantha a voucher so she could pop her cherry sky diving.
3281	734	He has a reputation of being a tom cat just looking to get his rocks off.
3282	734	I don’t want a serious relationship, just a guy I can get my rocks off with every now and then.
3283	734	There are a lot of online trolls who get their rocks off on insulting or annoying other users.
3284	734	It’s pretty creepy that some people get their rocks off on stuff like this.
3285	734	He gets his rocks off making life difficult for other people.
3286	734	The poor guy didn’t even manage to get his rocks off at the Yam festival, where women pursue the men.
3287	735	I’ve prepared an elaborate dinner for my family. Hopefully when they see it, it will knock their socks off.
3288	735	I’ve come up with an idea that I think will knock your socks off when you hear it.
3289	736	I was really angry, so I had to just take a second and cool my jets before I did anything rash.
3290	736	Cool your jets back there, we’ll be home in a few minutes.
3291	736	Would you cool your jets? The staff members you’re yelling at didn’t do anything wrong.
3292	736	The young senator has massive support in his home state, but he’d better cool his jets if he thinks the rest of the country will consider him presidential material.
3293	736	I know you want to get this project over and done with, but cool your jets and do the work carefully.
3294	736	Cool your jets, all right? If you’re done all that data entry already, you must have made mistakes.
3295	737	I know my knee-jerk reaction to the film’s ending was mostly negative, but over time I’ve come to appreciate its subtlety and poignancy.
3296	737	Unsurprisingly, there has been a knee-jerk reaction from many parents to have the book banned from schools.
3297	738	Sarah’s just teasing you. Don’t let her ruffle your feathers like that!
3298	738	Harry’s bombastic, arrogant demeanor tends to ruffle people’s feathers, but he’s a decent guy at heart.
3299	738	I didn’t mean to ruffle his feathers. I just thought that I would remind him of what he promised us.
3300	738	The bird ruffled its feathers when it was annoyed. My parrot ruffles its feathers whenever it is ready to preen itself.
3301	738	His management style ruffled a few feathers.
3302	738	The tall Texan ruffled some English feathers with his remarks.
3303	739	Jason has really turned over a new leaf—he hasn’t been in the slightest bit of trouble in months.
3304	739	I have made a mess of my life. I’ll turn over a new leaf and hope to do better. Why don’t you turn over a new leaf and surprise everyone with your good characteristics?
3305	739	While Eddie has turned over a new leaf, his brother can still be spotted in the bars along Sunset Strip.
3306	739	Both men have agreed to turn over a new leaf in their relations with each other.
3307	739	This is a new project to help ex-prisoners turn over a new leaf.
3308	740	The store isn’t far from here, it’s just around the bend.
3309	740	You can’t see it from here, but the beach is up around the bend.
3310	740	Once we got round the bend, we could see why traffic was at a standstill—an overturned tractor-trailer was blocking all three lanes.
3311	741	Of course we’re not getting raises again this year—that’s just par for the course at this point.
3312	741	Our son has been having awful tantrums lately, but he’s two years old, so that’s par for the course.
3313	741	A: "How’s your dinner?" B: "It’s up to par with this place’s usual standard."
3314	741	It’s nice to see that Jenny’s work is up to par again lately.
3315	741	So he went off and left you? Well that’s about par for the course. He’s no friend. I worked for days on this proposal, but it was rejected. That’s par for the course around here.
3316	741	I’m just not feeling up to par today. I must be coming down with something.
3317	741	The manager said that the report was not up to par and gave it back to Mary to do over again.
3318	741	There’s leaves and branches all over the streets, and the power is out. But that’s all par for the course in a hurricane.
3319	741	Long hours are par for the course in his job.
3501	783	Bob said, "Down the hatch," and drank the whiskey in one gulp.
3320	741	Why not him? Did he not look okay? Did he smell bad? Have bad breath? Were his clothes not up to par?
3321	741	Unfortunately, such short-sightedness is par for the course these days.
3322	742	The whole town is up in arms about the addition of a new shopping center.
3323	742	Mom was really up in arms after I dented her brand-new car.
3324	742	The entire population is up in arms.
3325	742	They are up in arms, ready to fight.
3326	742	Wally was up in arms about the bill for the broken window.
3327	742	I am really up in arms about what happened.
3328	742	More than one million shopkeepers are up in arms against the new minimum tax.
3329	742	This is a very delicate situation. Frank feels he has been publicly humiliated, and his sponsors are up in arms.
3330	742	Politicians from both sides of the House were up in arms at her strongest ever criticism of EU attempts to unite Europe.
3331	742	Local residents are up in arms over plans to build a new motorway.
3332	742	The whole town was up in arms about the planned highway.
3333	743	The senator started the press conference with guns blazing, forcefully denying the accusations and painting his accusers as pathological liars.
3334	743	The home team fell behind by a large margin in the first half, but you can expect them to come out with their guns blazing in the second half.
3335	744	After spending hours working with the new piece of software, I still could not make heads or tails out of it.
3336	744	I can’t make heads or tails of that new guy in accounting. Sometimes, he’s really friendly, and then other times he acts like he’s never met me before.
3337	745	Sorry, Mark, I’d love to give you a lift to the airport, but my car’s tits up on me again.
3338	745	It looks like our co-op might be tits-up if we aren’t granted a license for our communal work premises.
3339	745	We were all set to have our picnic on Saturday, but the weather went tits up, and we had to cancel at the last minute.
3340	745	The merger deal between the two companies turned tits-up when it came to light that one of the CEOs had been dodging tax obligations for several years.
3341	745	Her lousy pie fell tits up onto the kitchen floor.
3342	746	If he thinks he can call at this hour of the night, he can sit on it!
3343	746	Sit on it, Joe—I’m not helping you with this!
3344	747	He just tends to stick his foot in his mouth when he’s forced to speak for too long, so try to get him off stage as soon as possible.
3345	747	Oh man, did I ever stick my foot in my mouth—I just congratulated Sarah’s sister on being pregnant. She isn’t.
3346	748	I know we got off on the wrong foot when I was a half hour late to the interview, but I promise that I will always be on time once I start working here.
3347	748	The candidate’s election campaign has certainly gotten off on the wrong foot—did you see his disastrous performance at the debate?
3348	748	Make sure you’re on time and dressed professionally. You don’t want to get off on the wrong foot on your very first day of work, do you?
3349	748	We got off on the wrong foot the first time I met him.
3350	748	Their relationship had started off on the wrong foot, but the bond between Packer and Singleton grew stronger over time.
3351	748	Most of the farming people had some trouble with English pronouns (hi in Welsh is she in English, which starts them off on the wrong foot).
3352	748	I seem to have got off on the wrong foot with the new boss.
3353	749	After that nap, I am bright-eyed and bushy-tailed!
3354	749	As usual, the new interns are bright-eyed and bushy-tailed—just watching them is exhausting.
3355	749	Everyone is bright-eyed and bushy-tailed at the start of the school year—not so much as it drags on!
3356	749	Jill: Hi, Jane! How are you on this beautiful morning? Jane: Bright-eyed and bushy-tailed, just as you might expect, since I’ve only had three hours of sleep.
3357	749	Despite the early hour, Dennis was bright-eyed and bushy-tailed.
3358	749	But for now, go and sleep awhile. I need you bright-eyed and bushy-tailed tomorrow.
3359	749	This will be a busy year, so you need to be bright-eyed and bushy-tailed to cope.
3360	749	She came in to see me, all bright-eyed and bushy-tailed, and announced she was leaving the next day.
3361	749	You look all bright-eyed and bushy-tailed this morning.
3362	751	After my third cup of coffee, I really had to go bleed the lizard.
3363	751	The need to bleed the lizard aroused me from a sound sleep.
3364	751	Will you order us another round of drinks? I’m just going to go bleed the lizard real quick.
3365	752	I can’t believe my roommate walked in on me while I was choking the chicken—I’m so mortified!
3366	752	He talks on and on about how much of a ladies’ man he is, but I bet he spends most nights choking the chicken.
3367	753	A: "Why is he all embarrassed today?" B: "Oh, his crush walked in on him beating his meat. How horrifying is that?"
3368	753	He talks on and on about how much of a ladies’ man he is, but I bet he spends most nights beating his meat.
3369	754	I had such a stressful day at work that I went home and flicked the bean for an hour just to relax.
3370	754	She’s always talking about her sex life and making inappropriate jokes. Last night she even said something about flicking her own bean!
3371	754	I think it’s important for women to feel comfortable exploring their bodies and learning what feels good when they flick their beans.
3372	755	The government is introducing financial reliefs to soften the blow to those affected by the devastating floods.
3373	755	Playgrounds typically have sand or rubber grounds to help soften the blow if children fall off the play structures.
3374	755	When you have to tell someone about the death of a loved one, there’s really no way to soften the blow.
3375	755	Attempts were made to soften the blow, by reducing what some people had to pay.
3376	755	The firm is offering to cushion the blow with a £4,000 cash handout spread over two years.
3377	755	When he lost his job he was offered a cash payment to soften the blow.
3378	756	I think it’s pretty disgusting that your company sat pretty while millions of people lost their homes as a result of your negligence.
3379	756	Despite the protests in the country’s streets, the despotic regime will continue to sit pretty unless an international intervention is mounted.
3380	756	With all the money you inherited from Aunt Myrtle, you’ll be sitting pretty for the rest of your life.
3381	756	I’ll be sitting pretty for the rest of the semester if I can ace this test.
3382	756	My uncle died and left enough money for me to be sitting pretty for the rest of my life.
3383	756	Now that I have a good-paying job, I’m sitting pretty.
3384	756	She married a millionaire, and now she’s sitting pretty.
3385	757	When Jane didn’t get the job, she said it was probably too demanding anyway, a classic case of sour grapes.
3386	757	Dane said he didn’t care that we never invited him to the party, but his dismissal felt like sour grapes to me.
3387	757	It’s easy to say that the award doesn’t matter after losing. Such sour grapes don’t fool anyone.
3388	757	I think my mother’s criticism of the new restaurant is just sour grapes because she couldn’t get a reservation.
3389	757	Don’t give me sour grapes. You know you can’t have a snack before dinner.
3390	757	Is he really showing sour grapes over the fact that my ice cream was bigger than his?
3391	757	Yesterday, you loved my cookies, but today you claim they suck after I said you couldn’t have one. Geez, sour grapes, much?
3392	758	Ever since Mary got her promotion at work, she’s been on cloud nine. I don’t think I’ve ever seen her happier!
3393	758	I’ve been on cloud nine ever since I got engaged!
3394	758	We were all sitting on cloud nine after winning the championship game.
3395	759	I’ve been walking on sunshine ever since I found out my book was going be published.
3396	759	She walked on sunshine for a few weeks after getting her dream job.
3397	760	I’m sure you’ll be able to find a good job, but you’ve got to do the legwork.
3398	760	One isn’t going to just fall into your lap! The case is so huge that I brought on a legal aid to help do the legwork.
3399	760	I’m too old to do the gardening on my whole property, so each summer I hire a couple of local teenagers to do the legwork.
3400	761	My sister loves being in the limelight, but I get really nervous on stage.
3401	761	Once news of this scandal breaks, our company will be in the limelight for months.
3402	761	He handles the financial side of the business, but he prefers not to be in the limelight when it comes to promotions and marketing.
3403	761	If you are married to a Prime Minister, you are always in the limelight.
3404	762	Jane had her 15 minutes of fame when she appeared on the nightly news broadcast.
3405	762	That viral video gave Sam his 15 minutes of fame.
3406	762	I’ve seen what celebrity does to people, so I’m really not interested in getting 15 minutes of fame.
3407	763	We don’t need any troublemakers around here, so hit the bricks, fella.
3408	763	I think it’s time for us to hit the bricks.
3409	763	The workers hit the bricks again after the company implemented a unilateral pay cut to all employees.
3410	763	I have a long way to go. I’d better hit the bricks.
3411	763	Go on! Hit the pavement! Get going!
3412	763	The workers hit the pavement on Friday and haven’t been back on the job since.
3413	763	Agree to our demands, or we hit the bricks.
3414	763	Toronto’s 7,500 secondary teachers voted in favour of hitting the bricks.
3415	764	This is the end of the line, folks, so everyone needs to get off the bus.
3416	764	Printing our report is the end of the line—now, we just have to hand it in and pray for a good grade!
3417	764	Regardless of how this championship series goes, I know this is the end of the line for me, after 16 years in the league.
3418	764	The workers see the closure of the pit as the end of the line for mining in this area.
3419	764	It’s the end of the road for our relationship. We just can’t agree about anything any more.
3420	765	Sorry I couldn’t make it to your birthday lunch on Wednesday, I’m afraid I’m really in the thick of it at the office right now.
3421	765	Even when you are in the thick of it, try to take a moment each day and take a deep, calming breath.
3422	765	Soon he was in the thick of it, chatting in three languages, kissing hands, explaining and introducing.
3423	765	He suddenly found himself in the thick of desperate fighting.
3424	765	He was in the thick of preparing the food for the party, so I didn’t interrupt.
3425	765	If there’s trouble, you usually find him in the thick of it.
3426	766	It was a run-of-the-mill action movie—fine to kill a couple hours, but nothing special.
3427	766	I must say, for how many interesting points you bring up in class, your paper is rather run-of-the-mill.
3428	767	I didn’t have time to organize my thoughts, so I just spoke off the cuff.
3429	767	The senator has become known for making off-the-cuff remarks that create controversy.
3430	767	Her remarks were off-the-cuff, but very sensible.
3431	767	I’m not very good at making speeches off-the-cuff.
3432	767	I’m sorry—I didn’t mean any offence. It was a flippant, off-the-cuff remark.
3433	767	She delivered a brilliant off-the-cuff speech completely without notes.
3434	767	This wasn’t just an off-the-cuff decision.
3435	767	Eisenman was speaking off the cuff, and it’s possible that my tape recorder did not catch every last word.
3436	767	His remarks—apparently made off-the-cuff—have raised a storm of protest.
3437	767	I don’t know how you can stand up and give an after-dinner speech off the cuff like that.
3438	767	an off-the-cuff remark
3439	769	Our project has been off the rails ever since the manager up and quit last month.
3440	769	Oh, things are totally off the rails now that my in-laws are coming to town a week early.
3441	769	A: "I can’t believe everything has gone smoothly so far." B: "Just give it time—Thanksgiving dinner is always off the rails in this family."
3442	769	I think you should cut back on your drinking—you were totally off the rails last night!
3502	783	Let’s toast the bride and groom. Down the hatch!
3443	769	You can’t tell people you want to start a business selling bees as pets—they’ll think you’re totally off the rails!
3444	769	My youngest son got into drugs in high school and has been off the rails ever since.
3445	770	You’ve never heard of Lady Gaga? What, have you been living under a rock?
3446	770	Well, that’s all news to me! I swear I don’t live under a rock.
3447	771	We’re programmed from a young age to associate success with wealth, but the measure of a man is not the size of his bank account.
3448	771	My father always taught me that the real measure of a man is the respect and goodwill he engenders in others.
3449	773	My father never thought I’d measure up as a businessman because I was so shy and timid but I’ve been more successful than he is.
3450	773	My mother never thought I measured up to my older sister no matter how well I did.
3451	773	Lady Gaga’s latest CD does not measure up to the last.
3452	773	Unfortunately, this work doesn’t measure up to our standards and we’ll have to ask the consultant to do a re-write.
3453	773	Trying to measure up to your requirements is impossible. I quit.
3454	773	It wasn’t a good idea to put my son in an advanced math class. He was doing well in the regular course and now his morale is down because he’s not measuring up.
3455	773	It’s easier for our youngest to measure up to his siblings’ swimming records because we’ve learned a lot of things about training and conditioning from their experiences.
3456	773	It was depressing to be at a top university where I couldn’t measure up to my classmates.
3457	773	With photo editing, it’s impossible for women to measure up to fake standards but we try anyway and it’s causing serious mental health problems.
3458	773	A lot of adults’ problems in life stem from not feeling like they could measure up when they were children.
3459	774	New carbon taxes have proved to be a golden goose for the government, providing a steady and much-needed source of revenue.
3460	774	College athletics, especially football, have always been a golden goose for universities, which earn significant sums from attendance at games and tournaments.
3461	774	The company’s smartphone line has always been the company’s golden goose, driving exponential profits for nearly two consecutive decades.
3462	774	The government is worried that a new tax might kill the golden goose by scaring away foreign investment.
3463	774	The banks made vast profits from an energy trader that had become the golden goose of Wall Street.
3464	775	Disrupting my class is beyond the pale, young lady—go to the principal’s office!
3465	775	Most people would consider stealing to be beyond the pale.
3466	775	My mother says that a skirt this short is beyond the pale, but I think it’s just fine.
3467	775	Your behavior is simply beyond the pale.
3468	775	Because of Tom’s rudeness, he’s considered beyond the pale and is never asked to parties anymore.
3469	775	Any kind of physical aggression from your partner is beyond the pale.
3470	775	In those days divorced women were considered beyond the pale.
3471	775	Her behaviour towards her employees is completely beyond the pale. She treats them like servants.
3472	775	behavior that was quite beyond the pale.
3473	776	I never forgot the way he bullied and humiliated me in high school, but I chose to bide my time. Ten years later, my global corporation bought his family’s puny company and exploited it for everything it was worth, leaving him penniless. It’s true what they say—revenge is a dish best served cold.
3474	776	I don’t mind waiting to get revenge on Greg; I’ll wait ten years if I have to. Revenge is a dish best served cold.
3475	777	That actor had a catastrophic fall from grace after his racially charged tirade spread across social media.
3476	777	After my fall from grace with my previous employers, I decided to set out on my own and begin my own company.
3477	777	I’m shocked Larry didn’t get the promotion. I wonder what he did to fall from grace.
3478	777	It was either fall from grace or starve from lack of money. That’s how thieves are made.
3479	777	Given the choice between falling from grace and starving, few people choose to starve.
3480	777	I hear that Ted lost the Wilson contract and has fallen from grace with the boss.
3481	777	The accounting firm has fallen from grace and the board is looking for a new one.
3482	777	The cause of Ms Smith’s fall from grace was the same as Ms Clark’s: she had once hired an illegal immigrant to look after her son.
3483	777	His story represents one of the most spectacular falls from grace in film history.
3484	777	The last two years, of course, have seen the banks’ fall from grace in the eyes of the public.
3485	777	The band later fell from grace when it was discovered that they never sang on their own records.
3486	777	He was an officer in the local militia before he arrested a young official...for corruption and fell from grace.
3487	777	The government minister fell from grace as a result of the financial scandal.
3488	778	In this day and age, it’s not uncommon to go your whole commute without speaking to a single person.
3489	779	Why don’t you do the honors and greet people at the door? I’ll take their coats.
3490	779	Joe, do the honors and cut me a slice of that pizza, will you?
3491	779	The mayor was supposed to cut the ribbon, but he can’t make it, so we’ll have to find someone else to do the honors.
3492	779	A World to Build Two men were hanged at Pentonville, with the lugubrious Albert Pierrepoint doing the honours.
3493	779	Harry, could you do the honours? Tom and Angela both want gin and tonic.
3494	779	His father was ill, so Charles did the honours with the welcome speech.
3495	780	Apiros isn’t a typical gym, which tracks because Austin Einhorn isn’t a typical trainer.
3496	781	Jeff’s been hemming and hawing about which car to buy—I wish he would just pull the trigger already!
3497	781	If we don’t pull the trigger on this deal then we might never get the chance again.
3498	783	"Well, down the hatch!" Ellen said before taking her cough medicine.
3499	783	Shots are on me. Down the hatch, girls!
3500	783	Mr. Thompson, you’ve got to take your medication. Come on, now, down the hatch!
3503	783	A record £4.4 billion worth of chocolate and sweets went down the hatch last year.
3504	783	She raised the shell to her lips, closed her eyes and down the hatch went the oyster.
3505	783	Here’s a glass for you. Down the hatch!
3506	783	He raised his glass, said "Down the hatch", and then drank it all at once!
3507	783	Down the hatch! Have another?
3508	784	There’s a tornado coming—batten down the hatches!
3509	784	My mother-in-law is coming to town this weekend, so I better batten down the hatches.
3510	784	Exams are next week? Well, then, you kids better batten down the hatches!
3511	784	Here comes that contentious Mrs. Jones. Batten down the hatches!
3512	784	Batten down the hatches, Congress is in session again.
3513	784	While most companies are battening down the hatches, fearing recession, Blenheim is leading an assault on the US market.
3514	784	Banks seem to be battening down the hatches in anticipation of further trouble.
3515	784	They endured the hard pounding of the Seventies, when Labour battened down the hatches, and soldiered through the follies of the early Eighties.
3516	784	Hollywood is battening down the hatches in expectation of a strike by actors and writers this summer.
3517	786	The car dealership had quite the dog and pony show this weekend in an attempt to sell their old inventory.
3518	786	To help draw attention to the company’s new line of products, the manager took their dog and pony show on the road for a nationwide promotion.
3519	786	A: "Ugh, I hate having to be involved in this corporate dog and pony show every year." B: "Well, you’re stuck with it as long as it makes the company money."
3520	786	Gary went into his standard dog and pony show, trying to sell us on an upgrade to our software.
3521	786	Don’t you get tired of running through the same old dog and pony show at every trade show?
3522	786	I’m bombarding him and the others with charts, graphs, facts, and figures. The boss responds by dozing off during most of our dog and pony show.
3523	786	Ann and I sometimes do a dog and pony show at public libraries in the US.
3524	786	Happy as I always am to help the Bank of England, I have...supplied the script for its euro dog and pony show.
3525	786	They put on a dog and pony show in the hope of attracting new investors.
3526	786	The protest was just a dog and pony show designed to bring in the media.
3527	786	Willy was there with his dog and pony show about water safety.
3528	787	I’m thinking about throwing my hat in the ring for class president!
3529	787	As has been widely predicted, yesterday the governor threw his hat into the ring for the presidential election next year.
3530	787	We have been anticipating that South Africa would throw its hat into the ring for some time and have a high regard for the candidacy.
3531	788	I didn’t want to work with that organization until I realized that we all wanted to keep the same candidate out of the White House. That’s when I realized that my enemy’s enemy is my friend.
3532	789	Despite the insults my mother received about the way she chose to raise us, she decided to take the high road and not stoop to their level.
3533	789	When I was faced with an ethical dilemma at work, I chose to take the high road, even though it caused me to get fired.
3534	789	After getting slapped by Will Smith, Chris Rock took the high road, and fans loved him for it.
3535	789	Instead of getting involved in petty office gossip, I choose to take the high road and focus on my work.
3536	789	Taking the high road definitely isn’t always easy, but it shows the strength of character and personal values that not everyone has.
3537	790	I haven’t spoken to my brother for nearly three years because of a falling-out we had over our late father’s estate.
3538	790	My fiancé and my best friend had a falling out, and, unfortunately, I found myself caught in the middle.
3539	790	Apparently, Gina and Dave had a falling out last week, and now they’re not talking to each other at all.
3540	790	I haven’t spoken to my brother for nearly three years because of a falling out we had over our late father’s estate.
3541	791	I feel like a broken record having to tell you this each day, but please clean your room!
3542	791	A: "My wife has been like a broken record, constantly nagging me to clean out the garage." B: "Maybe if you actually did it, she’d leave you alone."
3543	791	I know I must be sounding like a broken record at this point, but it is crucial that you follow the steps exactly as I’ve planned them.
3544	792	The multi-million-dollar purchase of the small startup proved a bridge too far for the social media company, as the added revenue couldn’t make up for the cost in the end.
3545	792	Look, I’m happy to help you guys out, but I’m not willing be the primary investor in your invention—that’s just a bridge too far.
3546	792	Apparently, signing an A-list player is just a bridge too far for this team! They’d rather wallow in their mediocrity, I guess.
3547	793	I’ve been trying to think outside the box about what I want this term paper to be about. I know the professor hates unoriginal ideas.
3548	793	OK, team, we really need to think outside of the box if we’re going to impress the CEO.
3549	793	You won’t come up with good ideas until you think outside the box. Let’s think outside the box for a minute and try to find a better solution.
3550	793	They need to be able to think outside the box and move their role away from a purely technical focus.
3551	794	When the economy crashed, thousands lost their jobs, their homes, and their pensions in one fell swoop.
3552	794	With one fell swoop, the military junta arrested the prime minister, executed its enemies in parliament, and assumed total control of the country.
3553	795	The company’s financial problems were the elephant in the room that nobody wanted to acknowledge, but we had to address them to move forward with a new plan.
3554	795	With my mother planning to visit, my husband and I had to talk about the elephant in the room; she’s extremely rude, and everyone lets her get away with it.
3555	795	Despite the tension between my two best friends, the elephant in the room remained unaddressed, and now our group trip to Mexico is going to be awkward.
3610	812	Well, I was about to give the same explanation, but you’ve taken the words right out of my mouth.
3556	795	Listen, we need to talk about the elephant in the room before it becomes an even bigger problem. I think we should see a couple’s therapist.
3557	796	It seems like we’ve opened Pandora’s box with this topic today. We’ve been getting hundreds of messages from listeners from around the country who have been affected by it.
3558	796	Trying to fix the bug opened a Pandora’s box of other issues with the computer.
3559	797	I spent my whole college life thinking a cushy job like this was the pot of gold at the end of the rainbow, but I’m feeling a bit disenchanted now that I have it.
3560	797	I’m warning you, litigation is a costly, soul-crushing experience. Even if you win, there’s rarely a pot of gold at the end of the rainbow.
3561	798	Ben has been living off the fat of the land for too long—it’s time for him to get a job!
3562	798	If I had a million dollars, I’d invest it and live off the fat of the land.
3563	798	I’ll be happy to retire soon and live off the fat of the land.
3564	798	He was fed up with these royalists who were living off the fat of the land while the rest of the country was starving.
3565	798	Money was no problem then. We were living off the fat of the land in those days.
3566	798	It’s always the same: the rich live off the fat of the land and complain that the poor are lazy.
3567	799	Given the turbulent nature of this market, I think it would be prudent to understand the lay of the land before we agree to invest.
3568	799	I’m thinking about studying business, but I want to visit a few colleges first and check out the lay of the land.
3569	800	I’ve been having trouble getting this essay started—I just need to get my juices flowing.
3570	800	I find that a good run first thing in the morning always gets my juices flowing for the day ahead.
3571	800	We’ve been sitting here for an hour with nothing written, so let’s play a few word games to get our juices flowing.
3572	801	We had gotten used to dominating the other teams in our relatively small division, so when we played our first game at a professional level, we suffered an eye-opening defeat.
3573	801	Learning that John had been dealing with an opioid addiction for all those years was really eye-opening for me.
3574	801	The hurricane was eye-opening for a lot of people in the region who thought they’d never see a storm of that magnitude.
3575	802	Uncle Ned has finally stopped railing against our political system, so you better not poke the bear and get him going again!
3576	802	Why do you insist on poking the bear and doing things that make the boss mad?
3577	803	Rich had an affair with his secretary and spun a web of lies to hide it. He’s divorced now, so how do you think it all worked out for him?
3578	804	Wow, Anna has really come out of her shell lately. I remember when she wouldn’t even talk to anyone, and now she’s likely to be voted "Most Talkative."
3579	804	Jack is actually a very funny, engaging guy when he comes out of his shell.
3580	804	Samantha was quite a quiet girl growing up, but she really started coming out of her shell in college.
3581	804	Come out of your shell, Tom. Go out and make some friends.
3582	804	She used to be very timid and shy but I think she’s come out of her shell.
3583	804	I think the job has brought her out of her shell.
3584	804	He went into his shell as he got older, seeing less and less of his friends.
3585	804	When Anna first joined the club, it took her a long time to come out of her shell.
3586	806	He’s been putting out feelers to see how employees might react to such a policy.
3587	806	Why don’t you put out your feelers and see if anyone is interested in buying.
3588	806	A: "I wonder what’s going on with Jennifer lately." B: "I’ll see if I can put the feelers out the next time I see her."
3589	807	I always have a great time when Katie’s around—she’s more fun than a barrel of monkeys!
3590	807	Spending all morning at the dentist is not as much fun as a barrel of monkeys, let me tell you.
3591	807	You’re the kids’ favorite babysitter. To them, you’re more fun than a barrel of monkeys!
3592	808	Aww, look at Tommy pretending to wash dishes like you. Monkey see, monkey do!
3593	808	A: "As soon as one kid starts acting crazy, they all start doing it!" B: "Of course—monkey see, monkey do!"
3594	808	Unfortunately, it’s often a case of monkey see, monkey do with teenagers who get caught up in dangerous behaviors like drinking, having sex, and taking drugs.
3595	808	I don’t let my children watch TV programs that show kids being disrespectful to their elders. I know what would happen if I did: monkey see, monkey do.
3596	808	A danger with workplace training is a "monkey see, monkey do" approach which does not value skills and knowledge.
3597	808	Advanced technology has limited the independence of all nations and states. The world is now a global village, and monkey see monkey do as they all scramble for a dollar.
3598	809	Hulk Hogan got his ass handed to him in the latest wrestling match!
3599	810	After the banking sector brought on the economic collapse through lack of federal oversight, things seem to be coming full circle as politicians are beginning to call for deregulation of the industry once again.
3600	810	I used to work in kitchens during college to support myself, and now, after working for years as an attorney, I’ve come full circle and am the head chef of my own restaurant.
3601	810	I started out as an excellent student, and now that my grades are starting to improve again, I feel like I’ve come full circle.
3602	810	The family sold the house generations ago, but things have come full circle and one of their descendants lives there now.
3603	810	Looking at the current product, I am tempted to say the design has come full circle.
3604	810	Her life had now turned full circle and she was back where she started, alone and miserable.
3605	810	The wheel has turned full circle and we are back where we began.
3606	810	The wheel of fashion has come full circle. I was wearing shoes like that thirty years ago.
3607	811	They’ve been living high on the hog ever since David won the lottery.
3608	811	It must be a shock for them having to count their pennies like this—they’re used to eating high on the hog, after all.
3609	812	You took the words out of my mouth—I think she looks gorgeous, too!
3611	813	I am blown away by the show of support from everyone.
3612	813	I was blown away by how good that movie was!
3613	813	We had no idea Molly had such a beautiful singing voice, so we were blown away by her performance at the talent show.
3614	814	A: "At this point, I’m willing to go out with just about any guy, so long as he isn’t living in his parents’ basement." B: "Don’t you think you’re setting the bar a little low?"
3615	814	While you shouldn’t take just any job you can get after college, be sure not to set the bar too high for an entry level job, or you may have trouble landing one at all.
3616	814	I hear that the new restaurant around the corner really sets the bar for exquisite seafood.
3617	815	Their new smartphone is a complete game-changer. No one will be able to go back to the old design after this.
3618	815	This legislation has the potential to be a real game-changer for the country’s tax code.
3619	815	White noise has been a game-changer for us. It’s the only thing that gets the baby to sleep through the night.
3620	816	They should be arriving any minute, so keep your eyes peeled.
3621	816	Keep your eye peeled for a birthday gift we could give your mother.
3622	816	Tell everyone to keep their eyes peeled for the health inspector. We heard she’ll be doing a surprise inspection someday soon.
3623	816	Keep your eyes peeled for a parking space.
3624	816	We’re looking for Sally so keep your eyes peeled.
3625	816	I doubt if she’ll come back here, but keep your eyes skinned anyway.
3626	816	Keep your eyes peeled, and if you see anything suspicious, call the police immediately.
3627	817	Most men find out the hard way that hell hath no fury like a woman scorned.
3628	818	That restaurant is top-notch—you’ll definitely get a good meal there.
3629	818	This is not a case of nepotism—Astrid won the award because her project was top notch.
3630	818	Julie’s singing in the musical is top notch.
3631	818	He prepared a top-notch meal before the movie and dessert for afterward.
3632	819	Films at the festival were hit or miss, but they were all unique.
3633	819	The company still relies on hit-or-miss techniques that seem antiquated by today’s standards.
3634	819	The tour around the region felt a bit hit or miss, with no clear agenda or plan.
3635	820	I tried shooting my shot with that hot actress when I saw her backstage at the awards show. Yeah, she was not interested.
3636	820	I know you’re shy, but you have to shoot your shot so that these companies know you want to work for them—and that you bring a lot to the table.
3637	821	It may not have been a huge success, but this film is a real hidden gem from the 1980s.
3638	821	The reviewer calls the restaurant one of the hidden gems of Manhattan.
3639	822	He’s gotten too big for his boots ever since he got that promotion.
3640	822	John’s been too big for his boots now that he’s been scouted by pro teams.
3641	822	I was often accused of being too big for my boots.
3642	822	If you ask me, he’s too big for his britches since he struck it rich.
3643	822	In Britain, people seem to have a thing about not letting someone get too big for their boots.
3644	822	Getting too big for their britches, kids these days. Think the whole universe should revolve round them.
3645	822	His political rivals had decided that he was getting too big for his boots.
3646	823	Samantha got a big head after her book became a bestseller.
3647	823	I hope you don’t get a big head from all the praise your parents heap on you.
3648	823	A: "Bill has been so annoying lately." B: "I know, he really got a big head after being named manager."
3649	824	Uh oh, Grandpa is getting on his soapbox about local politics again.
3650	824	It always drives the rest of the family crazy! Whenever Janet gets on her soapbox like this, I just try to tune her out.
3651	824	If Joe gets on his soapbox about public safety, the Dean is going to listening to that for a long time.
3652	825	You’re preaching to the choir here—we all have kids and understand how busy life can get.
3653	825	Honestly, you’re preaching to the choir, but I just don’t have any money to donate.
3654	825	There is no need to convince us of the value of hard work. We already know that. You are just preaching to the choir.
3655	825	Don’t waste your time telling us about the problem. That’s preaching to the choir.
3656	825	Bob found himself preaching to the converted when he was telling Jane the advantages of living in the suburbs. She already hates city life.
3657	826	I called a babysitter because I’ve had it with toddler temper tantrums today.
3658	826	I’ve had it up to here with the lack of raises at this job. Why do I even bother putting forth effort every day?
3659	828	Three championship titles in a row? Wow, that team is really on a roll.
3660	828	Jim was really on a roll last night with his jokes—we couldn’t stop laughing!
3661	828	It takes me a while to get some ideas down, but once I get on a roll, I usually end up writing five or six pages a night.
3662	828	Don’t stop me now. I’m on a roll.
3663	828	Things are going great for Larry. He’s on a roll now.
3664	828	Emerging markets, too, are on a roll.
3665	828	I made a name for myself and I was on a roll, I couldn’t see anything going wrong.
3666	828	Once you get on a roll you feel as though you’re unbeatable.
3667	828	Western economists cottoned on to basic "flaws" in the [Indonesian] economy which they hadn’t noticed (or didn’t want to notice) while it was on a roll.
3668	828	"The stock market’s on a roll"
3669	829	I’m usually a pretty calm person, but whenever I start driving I find I have such a short fuse.
3670	829	When we were kids, my dad had a very short fuse, but he’s mellowed out since then.
3671	829	That short fuse of yours is going to get you into trouble one of these days.
3672	829	I knew she’d blow. She’s got a short fuse.
3673	830	That lady in the car behind me is a real hothead, honking and shouting at me every time I slow down!
3674	830	He turns into a bit of a hothead when he is drinking, always looking to get into a fight with someone.
3675	830	Don’t be such a hot head, Chuck.
3676	831	After so many years of hard work, "Jane Smith, Vice-President of Marketing" sure has a nice ring to it.
3677	833	You’re having a baby shower for Carla today? Wow, I didn’t even know she had a bun in the oven.
3678	833	We were thinking about moving overseas this summer, but we had to shift course when we found out about our little bun in the oven.
3679	833	A: "Oh my gosh, you guys have another bun in the oven?" B: "Yep, and when she gets here, we’ll have four kids under the age of four, which is only a bit terrifying to consider!"
3680	834	I spent a lot of my 20s feeling like nothing but a face in the crowd, but over time I’ve come to identify and value what makes me unique.
3681	834	The community member is no longer just a face in the crowd—she has become the de facto leader of a national movement that continues to gain momentum.
3682	834	I would never court fame—I’m quite happy just being a face in the crowd.
3683	835	As a new parent, you learn that there’s a fine line between looking out for your child’s welfare and being overprotective.
3684	835	A: "I only borrowed your sweater, I swear!" B: "Well, it’s a fine line between borrowing and stealing, isn’t it?"
3685	835	The film treads a fine line between parody and homage.
3686	835	There is a fine line between being nicely looked after and being fussed over too much.
3687	835	A new exhibition explores the fine line between genius and insanity.
3688	835	There is a thin line between being a good player and being one of the best.
3689	835	There’s a narrow line between being interested and being nosy.
3690	836	I know you want to buy a new TV with your bonus, but you should really save that money for a rainy day.
3691	836	I save a portion of my wages each month for a rainy day.
3692	836	I’ve saved a little money for a rainy day. Keep some extra allowance for a rainy day.
3693	836	Saving for a rainy day and paying off debts is now a top priority for families.
3694	836	Job loss fears are forcing millions of consumers to save for a rainy day rather than borrow.
3695	836	These people spent the money when they had it. They did not put it by for a rainy day!
3696	836	"Don’t spend it all at once", his aunt said. "Save some of it for a rainy day."
3697	837	My brother is so strong and scary-looking that people shake in their boots when he threatens them.
3698	837	Ooh, I’m really scared of you! I’m shaking in my boots, you frighten me so!
3699	837	I was shaking in my boots because I had to go see the manager for being late. Stop quaking in your boots, Bob. I’m not going to fire you.
3700	839	We’ll wait long enough for them to let their guard down before we launch our invasion.
3701	839	There will always be people in this business looking to exploit you, so you can never let your guard down.
3702	839	He never lets his guard down because he trusts no one.
3703	840	I wasn’t impressed when Gary suggested a hole in the wall for our first date, but we ended up having a good time.
3704	840	I went into this little hole in the wall where they had the nicest little gifts.
3705	840	His office is just a hole in the wall.
3706	841	With this new way of preparing vegetables, you’ll no longer have to pull teeth to get your kids to eat their greens!
3707	841	I’ve been pulling teeth trying to get my family members organized for this get together, but I think it will all be worth it!
3708	841	The watchdog did a great job keeping predatory loan sharks in check, but the new policy really pulled the agency’s teeth.
3709	841	Corporate lobbyists are trying to pull the new law’s teeth to give them greater leeway in the market.
3710	842	Why don’t you go take a load off for a while, and I’ll fix dinner for tonight?
3711	842	Ah, you’ve finally arrived! Come on in and take a load off your feet.
3712	843	You have to stay tough during business negotiations or else you may end up getting the shitty end of the stick.
3713	843	With three older brothers, I always get the shitty end of the stick when it comes to doing chores.
3714	844	Here, have a banana, it should tide you over until lunch.
3715	844	Could you loan me $20? I just need it to tide me over until I get paid on Friday.
3716	844	I’m still waiting for the next full-fledged sequel to come out, but this TV miniseries will tide me over for now.
3717	844	Will this amount tide us over until next week? There is enough food here to tide over the entire camp until next month. Yes, this will tide us over.
3718	844	A $100 loan would tide me over till payday.
3719	845	Oh man, my car wouldn’t start this morning—I just made it here by the skin of my teeth!
3720	845	The whole building exploded because of the gas leak. Thankfully, the crew escaped by the skin of their teeth.
3721	845	A: "Did Billy show up before the exam started?" B: "Yeah, by the skin of his teeth, thank goodness."
3722	845	In the men’s First Division, the champions survived by the skin of their teeth.
3723	845	She was there when the fighting started and escaped by the skin of her teeth.
3724	846	Everyone knows you’ve been riding on the coattails of the governor these last two years, but once her term ends, you’ll be on your own!
3725	846	Jonathan rode the coattails of his professor to get some recognition for his own work in several esteemed academic journals.
3726	847	Privates, I’m knee deep in your ass right now because the 1st Sgt was knee-deep in my ass this morning, and shit rolls down hill!
3727	848	If you need me, just call—I’ll be there in a heartbeat.
3728	848	Oh, I’d move in a heartbeat—I’m so sick of the cold winters in this region.
3729	848	If I had the money, I would go back to college in a heartbeat.
3730	848	Just tell me that you need me and I’ll come there in a heartbeat.
3731	848	If I was offered another job, I’d leave in a heartbeat.
3732	849	Oh, this is the calm before the storm—the dinner rush will turn this place into a mad house.
3733	849	Activists are preparing for a massive legal battle over the proposed legislation. They say that we’re currently in the calm before the storm.
3734	849	When there’s only a few minutes until an event is set to start, you realize that you’re in the calm before the storm and you get a rush of adrenaline.
3735	849	Oh, things are quiet now, but it’s just the calm before the storm—the dinner rush will turn this place into a mad house.
3736	849	Activists are preparing for a massive legal battle over the proposed legislation, calling the current period the calm before the storm.
3737	849	Things are relatively relaxed at the moment, but I think it’s probably the calm before the storm.
3738	849	The Emergency Department is fairly quiet, the lull before the storm.
3739	849	The fragile ceasefire may be just the lull before another storm.
3740	849	What the country was experiencing was not peace, but just the calm before another storm.
3741	850	The invaders took the castle by storm.
3742	850	The SWAT team smashed the door down and took the gunman by storm.
3743	850	There’s a new fad among kids and teens that is taking the country by storm.
3744	850	The sleep therapy technique for children has taken parents around the world by storm.
3745	850	The army took city after city by storm. They crashed in and took the general by storm.
3746	850	The singing star took the audience in each town by storm. The star took the critics by storm.
3747	850	The police took the building by storm; two people were injured during the operation.
3748	850	Lord of the Rings took the whole world by storm; it was one of the most successful movies ever made.
3749	850	a new play that took New York City by storm.
3750	851	Our hope is that this expedition will lift the veil on the secrets of the ancient king’s tomb.
3751	851	The celebrity’s interview purports to lift the veil on her extremely private married life.
3752	852	If this clinical trial is successful, it will be a real feather in her cap.
3753	852	Getting promoted to management after spending only a month at the new job was a feather in her cap.
3754	852	Earning that full scholarship to Yale is quite a feather in his cap.
3755	852	To take six wickets in the last innings of the game was a feather in his cap.
3756	852	It’s a real feather in his cap to represent his country in the Olympics.
3757	853	I know you’re unhappy about it, but Grandma’s will was clear-cut—all of her money goes to Elise.
3758	853	There is no one clear-cut path to success.
3759	853	It would be a lot easier if there were a clear-cut villain in this situation for us to blame.
3760	853	The environmental group is attempting to stop the logging company from clear-cutting a vast swath of forest.
3761	853	As long as they’re making a profit, these huge corporations have no qualms about clear-cutting the Amazon.
3762	853	I can’t believe they clear-cut this whole area for a stupid new shopping center!
3763	853	The clear-cut tract looks like an alien landscape with its acres of stumps.
3764	853	Honestly, it’s devastating to see the sprawling park of my childhood clear-cut like this.
3765	853	Well, judging by this clear-cut area of the forest, the environmental group must have failed in their efforts to stop the logging company.
3766	854	Oh, I know he’s head over heels in love with Christina—he won’t stop gushing about her!
3767	854	We used to be head over heels, but now we just annoy each other most of the time.
3768	855	We have to go for broke with this marketing campaign if we want our product launch to be successful.
3769	855	Come on! When you run, you’ve got to go for broke and beat your opponent to the base!
3770	855	You need to go for broke if you want to beat your competitors in this heat.
3771	855	Okay, this is my last chance. I’m going for broke.
3772	855	Look at Mary starting to move in the final hundred yards of the race! She is really going for broke.
3773	855	I had already won the Under-16 British squash championships, and I decided to go for broke and turn professional.
3774	855	In London’s West End there is a reluctance to take risks with new plays while going for broke on musicals.
3775	855	Three astronauts plan to walk in space today in a go-for-broke effort to retrieve a communications satellite.
3776	855	I decided to go for broke and start my own business.
3777	855	We decided to go for broke, and that is exactly how we ended up.
3778	856	The opening band totally stole the show tonight—they were amazing.
3779	856	I’m sorry, I was trying to listen to your speech, but your adorable little sister stole the show when she came prancing out here.
3780	856	All three singers gave impressive performances but it was Domingo who stole the show.
3781	856	It’s Jack Lemmon who finally steals the show, turning in his finest performance in years.
3782	856	The show-stealer at Citywalk, however, isn’t some Hollywood megastar, but a giant gorilla that hangs like King Kong from the front of the store.
3783	856	Actors don’t like working with animals because they often steal the show.
3784	857	In a nutshell, the app helps you to plan parties.
3785	857	I don’t want the long version—just tell me what your thesis is in a nutshell.
3786	857	To put it in a nutshell, the servers are crashing because of an issue with our power supply.
3787	857	Let me put it in a nutshell for you—if you show up late again, you’re fired!
3788	857	This cable channel provides the latest news in a nut shell. In a nut shell, what happened at work today?
3789	857	She wants me to leave the company. I want to stay. That’s it in a nutshell.
3790	857	I don’t know what I’m doing and I guess that’s the problem in a nutshell.
3791	857	Unemployment is rising, prices are increasing; in a nutshell, the economy is in trouble.
3792	857	"Do you like his idea?" "To put it in a nutshell, no."
3793	857	Just give me the facts in a nutshell.
3794	858	That crazy drunk driver nearly hit me! I hope they lock him up and throw away the key!
3795	859	Oh man, another warm, sunny day? I’m in hog heaven!
3796	859	Oh, just give the kids some crayons and paper, and they’ll be in hog heaven.
3797	859	Bill’s a fan of Clark Gable, so when the movie theater had a Clark Gable movie festival, Bill was in hog heaven.
3798	859	Jane loves to quilt, so she was in hog heaven when they opened that new store for quilters.
4477	994	He has been buying property at rock-bottom prices.
3799	860	Every time I see Jenna, Kelli is right there with her. Those two are really joined at the hip these days.
3800	860	Those two are joined at the hip. They are always together.
3801	860	Sam and Martha are joined at the hip.
3802	860	The couple who are almost joined at the hip in their 20s may have become quite distant in their 40s.
3803	860	Though we often work together, we’re not joined at the hip.
3804	860	Trends in world trade and trends in the environment are supposed to be joined at the hip.
3805	860	You can’t look at Wall Street without looking at Washington. They’re joined at the hip.
3806	860	She and Scott didn’t separate all night. It’s like they’re joined at the hip or something.
3807	860	Astronomy isn’t physics, but they’re joined at the hip.
3808	860	The two companies are joined at the hip through their joint ownership of the TV station.
3809	861	My jokes always seem to go over Stephanie’s head, so I’m glad you think I’m funny at least.
3810	861	A lot of this technical stuff is way over my head.
3811	861	She just wouldn’t listen to me, so I had to go over her head to her boss and complain about it.
3812	861	All these bills are hanging over my head, and I don’t get paid for another week.
3813	861	I’m so glad that exam is over—it’s been over my head for months.
3814	862	I know you think you’re in control of this undercover operation, but you’re in too deep now—you care about these people too much to arrest them!
3815	862	Now that we’re engaged, I’ve realized I’m in too deep with a man I don’t really love.
3816	863	Once news of this scandal breaks, our company will be under the spotlight for months.
3817	863	Unemployment has once again come under the spotlight.
3818	863	He’s a shy man, who really doesn’t enjoy being in the spotlight.
3819	864	Since I got that official reprimand in work, it feels like I’m being put under a microscope by my boss.
3820	864	The country’s surveillance methods have been under a microscope lately, after it emerged that it had been eavesdropping on its own citizen’s communications.
3821	865	A tag team is only as strong as its weakest member.
3822	865	Now that we’re a tag team, I think we’ll get through this project a lot faster.
3823	865	Let’s tag team to get this project done.
3824	866	You all look great in your costumes! Break a leg!
3825	866	Break a leg in the talent show, Danielle!
3826	866	"Break a leg!" shouted the stage manager to the heroine.
3827	866	Let’s all go and do our best. Break a leg!
3828	866	Jason sent Phillip a fax before Monday’s show, with the greeting: "Break a leg and enjoy yourself."
3829	866	You’d better leave now if you want to arrive early for the exam. Break a leg!
3830	867	Tiffany wants to pursue a career in modeling, but she’s only five feet tall, so the cards are stacked against her.
3831	867	The cards are stacked against their campaign, thanks to a lack of funding.
3832	868	You may think that your time as a TV show writer prepared you well for this project, but it’s a whole different beast working on a film.
3833	868	It’s one thing to babysit your friends’ kids from time to time, but having your own children is a whole different beast!
3834	868	A: "I’ve been here 10 years already, so I don’t think becoming a manager will be a big transition." B: "Are you serious?"
3835	868	No, managing employees is a whole different beast.
3836	869	My nephew is just the apple of my eye.
3837	869	He has five kids, but his only daughter is clearly the apple of his eye.
3838	870	That company’s stock price plummeted after the media blew the lid off the CEO’s embezzlement scandal.
3839	870	An anonymous tip to the police is what blew the lid off the theft ring.
3840	870	She is known for blowing the lid off the government’s massive cover-up.
3841	871	I ran into my boss in town, so I had to think up an excuse on the fly as to why I wasn’t at work.
3842	871	I’ll try to capture the data on the fly.
3843	871	Please try to buy some aspirin somewhere on the fly today.
3844	871	These people can make decisions on the fly and don’t have to phone home to their boss.
3845	871	This gives architects and designers the power to build an environment, explore it and maybe do some designing on the fly.
3846	871	I usually eat my breakfast on the fly.
3847	871	This is a new program that creates GIF images on the fly.
3848	871	took lunch on the fly.
3849	871	The outfielder caught the ball on the fly.
3850	871	The ball carried 500 feet on the fly.
3851	871	A coach can change players on the fly in hockey. This computer program compiles on the fly when a script is executed.
3852	872	John and I have been out of touch since high school, so I really have no idea what he’s up to these days.
3853	872	Dad, you’re so out of touch—no one listens to CDs anymore!
3854	872	I don’t think you realize just how harmful out-of-touch attitudes like that can be.
3855	872	Wow, I haven’t swung a bat in 10 years—I’m out of touch.
3856	872	I’ve been out of touch with my brother for many years. I couldn’t go back into mechanics because I’ve been out of touch for too long.
3857	872	I will be out of touch during my flight to Los Angeles.
3858	873	Ah, don’t get your knickers in a twist, I’ll have the car back by tomorrow morning!
3859	873	In my opinion, people are getting their knickers in a twist over this election.
3860	873	A: "Oh no, our picnic is ruined!" B: "It’ll stop raining soon—don’t get your knickers in a twist."
3861	873	He’ll get a nasty shock, but he’s not the first one, and he won’t be the last, so why get our knickers in a twist?
3862	873	Let’s not get our knickers in a twist until we see the outcome of those games.
3863	873	So why do these MPs have their knickers in a twist?
3864	873	I’m not as anxious as I was... Most things these days, I’m really not going to get my knickers in a twist about.
3865	873	The boss is getting his knickers in a twist about these sales figures.
3866	873	Don’t get your panties in a knot about it! It’s no big deal.
3867	874	John rushed to New York to stake his claim to his father’s inheritance money.
3868	874	Both countries have staked out a claim to the land.
3869	875	I’m really surprised that the sequel even holds a candle to the original.
3870	875	John’s fast all right, but he can’t hold a candle to Louise!
3871	875	This film doesn’t hold a candle to his previous ones.
3872	876	Did you hear that old Walt bought the farm? What a shame—at least he got to spend 92 years on this earth.
3873	876	I’m so sorry to hear that Myrtle bought the farm. She was always such a sweet old lady.
3874	876	Sonny, what we were you doing up on the roof? One false move and you would have bought the farm!
3875	876	Did you hear that Johnny bought the farm? I think the funeral is next Tuesday.
3876	876	When I was in that accident, I was so scared that I would buy the farm.
3877	877	A good summer book always has a cliffhanger at the end of each chapter so that you never want to put it down!
3878	877	Judging by that movie’s cliffhanger, I’d say we’ll be seeing a sequel coming out fairly soon.
3879	877	The TV show kept audiences in suspense with a big cliffhanger at the end of the season finale.
3880	877	That show is a cliffhanger—the episodes never really have endings.
3881	877	That medical drama isn’t particularly good, but it is a cliffhanger, so people just keep on watching it.
3882	877	If that show’s a cliffhanger, then, nah, I’ll pass—I like 30-minute episodes with neat resolutions.
3883	877	The two teams have been neck and neck for the entire second half, and with two minutes left this match has become a real cliffhanger.
3884	877	This election is looking like a cliffhanger, and we won’t be able to truly say who’s won until all the votes are counted.
3885	877	If all of the sport’s best make it to the final heat, it will definitely be a cliffhanger.
3886	878	I’m sorry, what is this we’re discussing? I’m a little out of the loop.
3887	878	They tried to keep the boss out of the loop about their scheme, but she found out about it anyway.
3888	879	Alex has been really gloomy lately. I hope he snaps out of it soon, because we’ll need him to present our project to the supervisor next week.
3889	879	The company is hoping to snap out of their recent sales slump with the launch of their latest smartphone.
3890	879	For heaven’s sake, Ann, snap out of it! Things aren’t that bad!
3891	879	She wouldn’t talk to anyone for days, but her friends helped snap her out of it.
3892	880	Are you able to parse anything out? This letter is so cryptic.
3893	880	I love that his mysterious lyrics give listeners a lot to parse out.
3894	881	I’m delighted with how that all panned out!
3895	881	I hope this decision pans out for him.
3896	881	Tom is panned out on the sofa, if you’re looking for him.
3897	881	Would you mind fixing dinner tonight? I need to go pan out for a little while.
3898	881	The camera zoomed out.
3899	881	Pan out at this point in the script and give a wider view of the scene.
3900	881	I’m glad to see that your business plan has panned out.
3901	881	My plans panned out poorly.
3902	881	Don’t worry. Everything will pan out okay.
3903	883	My father’s company is now going down the drain because of the incompetent new CEO.
3904	883	You got a C average? Boy, your grades have really gone down the drain this semester.
3905	883	We had big plans for our trip, but the terrible weather sent it all down the drain.
3906	883	All of our savings have gone down the drain ever since Jack had his little gambling spree in Las Vegas.
3907	883	My degree in literature has so far been a lot of money down the drain, as the only jobs I’ve been able to get have been in restaurants waiting tables.
3908	883	All of these gadgets you buy are just money down the drain, if you ask me.
3909	883	They were aware that their public image was rapidly going down the drain.
3910	883	People don’t like to see marriages going down the tubes.
3911	883	Neil admitted recently that long working hours mean his personal life has gone down the toilet.
3912	883	Over the years, the government has poured billions of dollars down the drain propping up its national airlines and other firms.
3913	883	You have ruined everything—my perfect plans, my great organization. All those years of work are down the drain.
3914	883	Millions of dollars have gone down the plughole.
3915	883	All his savings are gone down the drain.
3916	883	He watched his business, which had taken so long to build up, go slowly down the drain.
3917	883	A lot of money went down the drain in that Wilson deal.
3918	883	All of our best laid plans are down the drain.
3919	884	The company’s connection to the disgraced media mogul will likely prove to be its kiss of death.
3920	884	The president refused to stand by the senator during the crisis—essentially giving him the kiss of death.
3921	884	The conventional view of the timber industry is that it is the kiss of death for a rainforest.
3922	884	Living with other painters is the kiss of death.
3923	884	I commend the Commission’s recent Green Paper and its efforts to introduce an enlightened, evolutionary discussion—although I hope my saying so will not be the kiss of death.
3924	884	When the chairman said he had every confidence in me, I knew it was the kiss of death. A week later I was looking for another job.
3925	884	Your attitude was the kiss of death for your employment here.
3926	885	Have you ever tried the pistachio gelato at this place? It’s absolutely the bee’s knees!
3927	885	I’m so crazy about the girl I’ve started seeing. I think she’s the bee’s knees, and I don’t care who knows it!
3928	885	Tom’s new Cadillac is really the bee’s knees!
3929	885	Boy, that singer last night was the bee’s knees, wasn’t she?
3930	885	I loved this jacket when I bought it—I thought it was the bee’s knees.
3931	885	He thinks he’s the bee’s knees (= has a high opinion of himself).
3932	886	It’s a shame the candidate allowed himself to fly off the handle like that during the debate, since it undermines a lot of the really solid arguments he’d been making up to that point.
3933	886	I know you’re upset, but there’s no point flying off the handle like that. It was just an honest mistake.
3934	886	Hey, don’t fly off the handle at me because you didn’t get the promotion—I had nothing to do with their decision!
3935	886	Every time anyone mentions taxes, Mrs. Brown flies off the handle.
3936	886	If she keeps flying off the handle like that, she’ll have a heart attack.
3937	886	When I finally managed to speak to him, he flew off the handle and shouted down the phone.
3938	886	There’s no need to fly off the handle!
3939	886	flew off the handle when the train was finally canceled.
3940	887	Due to a lack of evidence, the suspects were let loose by police.
3941	887	Samantha was suspended for letting mice loose throughout the school.
3942	887	It’s so nice to go to the park and let the kids loose for a while.
3943	887	I hope the board of directors aren’t let loose on our project. We can’t afford to have them changing things last minute!
3944	887	The trapped wolf let loose a bone-chilling howl.
3945	887	The home team began to let loose an unwavering offensive barrage against their cross-town rivals.
3946	887	The owner of the ranch let his hounds loose upon the trespassers.
3947	887	With news of the military junta’s governmental overthrow, a wild, riotous pandemonium was let loose across the already unstable country.
3948	887	Teenagers need a place to let loose.
3949	887	She let her hair loose and it fell around her shoulders.
3950	887	Who let the dogs loose?
3951	887	He was at last let loose in the kitchen.
3952	887	A team of professionals were let loose on the project.
3953	888	I should have the report ready for you by this afternoon, I just need to come to grips with this new software update first.
3954	888	I’ve tried, but I just can’t come to grips with Amy, she’s totally out of control!
3955	888	It’s going to take him time to come to grips with a serious diagnosis like that.
3956	889	This place is a real dump—we’ll have to rebuild it from the ground up.
3957	889	I built this company from the ground up—I’m not going to sell it, ever.
3958	889	A: "The engineering department is such a mess right now." B: "I know, the next department head is going to have to rebuild the entire program from the ground up."
3959	889	We must plan our sales campaign carefully from the ground up.
3960	889	Sorry, but you’ll have to start all over again from the ground up.
3961	889	designed the house from the ground up; learned the family business from the ground up.
3962	890	"John asked me if he could borrow money to pay his rent, he spent his on a new guitar," said Maria. "John spent his rent money? Well, I’ll be a monkey’s uncle. Not John!" replied Greg.
3963	890	"The president wants to get us back into space," said Ben. "Well I’ll be a monkey’s uncle," said Tony, "didn’t he just slash the NASA budget in half?"
3964	890	I’ll be a monkey’s uncle. We’re halfway through April and it’s snowing outside.
3965	891	We need some more help with this mailing campaign. Go around the office and rally the troops for some good ol’ fashioned envelope stuffing.
3966	892	Our electricity bill was off the charts last month! How could we be using that much energy?
3967	892	I’m telling you, that concert is going to be off the charts!
3968	893	You know, Jack, you may be my friend, but you can be a real pain in the ass sometimes!
3969	893	This calculus homework is a pain in the ass. It’s not that I don’t understand it, it’s just so tedious!
3970	894	We need to cover all the bases here—the investigation should explore every avenue.
3971	894	I covered all the bases by applying to 15 colleges.
3972	894	I’m worried that undercover cops are sniffing around now, so, to cover all the bases, don’t talk to anyone you don’t know.
3973	895	Yeah, he’s not an offensive defenseman by any stretch, but his skating is next-level. If anyone on my team is going to catch up to an opposing player on a breakaway, it’s him.
3974	895	Some next-level, creative thinking is the only thing that will get us out of this mess.
3975	896	The terms of the loan look pretty good at face value, but be sure to read the fine print or you could find yourself in a heap of trouble down the line.
3976	896	I know reading the fine print can be tedious, but it’s always important to know what you’re getting yourself into.
3977	897	A: "Are we proceeding with the ad campaign?" B: "The jury is out on that. We want to bring in a few more focus groups."
3978	897	The jury’s still out on what are the long-term effects of air pollution.
3979	897	Specialists haven’t been able to make up their minds whether hair dye is safe or not. "The jury is still out," says Dr Venitt firmly.
3980	897	The jury is still out, but it looks as if there are no significant changes in the cosmic dust flux during past climate cycles.
3981	897	No one knows whether the government’s housing policy is popular or not. The jury is still out on that until the next election.
3982	897	Was he a good leader? The jury is still out on that question.
3983	898	I broke the seal too early, now I’ll have to go to the bathroom for the rest of the evening!
3984	898	Don’t break the seal yet, this is only the second bar we’re going to!
3985	898	Trust me, I wouldn’t have broken the seal if I didn’t have to pee so bad!
3986	899	Just so you know, I’m all in if you’re serious about taking that cross-country trip next week.
3987	899	Don’t start this renovation project unless you’re all in—or willing to live without a shower for a while.
3988	899	I can’t believe my junk-food-loving little sister is suddenly all in on yoga and wellness.
3989	900	I didn’t planning on betting so much until Jason upped the ante on us.
3990	900	I’m just going to threaten them a little and up the ante so that they finally pay up.
3991	900	Sellers have upped the ante in this area so much that first-time buyers can no longer afford it.
3992	900	Pete upped the ante on that the poker game to $100 per hand.
3993	900	Don’t up the ante any more. You’re betting far too much money already.
3994	900	Sensing how keen the people looking at the house were, Jerry upped the ante another $5,000.
3995	900	"Don’t try to up the ante on us," said the man, "We know what the asking price is."
3996	900	The secretary of state last night upped the ante by refusing to accept the election results.
3997	900	Whenever they reached their goal, they upped the ante, setting increasingly complex challenges for themselves.
3998	900	These judges have raised the ante by challenging the authority of the Chief Justice.
3999	900	Its network television division upped the ante by paying an estimated $2 million a year for an overall deal.
4000	900	My defeat came when I was unable to persuade my backer to raise the ante.
4001	900	This report ups the ante on the pace at which these cases need to be identified and treated.
4002	900	His ex-wife has upped the ante in her alimony suit against him.
4003	901	The bank’s implosion acted as a tipping point for the economic recession, as stock markets crashed and countless other businesses were forced into bankruptcy as a result.
4004	901	The execution of the rebel leaders proved to be a tipping point for the country, as the public overwhelmingly shifted to an anti-empire sentiment.
4005	901	We’re at a tipping point; if we spend just a bit more, we will get a large increase in productivity.
4006	902	His embarrassing secret is my ace in the hole, and I plan to reveal it to everyone the next time he mocks me publicly.
4007	902	She’s keeping all the details of their unscrupulous business practices as an ace in the hole should they ever try to fire her.
4008	902	The twenty-dollar bill I keep in my shoe is my ace in the hole.
4009	902	Mary’s beautiful singing voice was her ace in the hole in case everything else failed.
4010	903	While scrolling down the menu of Grand Theft Auto V, I happened upon an Easter egg.
4011	903	My parents are amazing; they left me an Easter egg.
4012	903	My boss’s emails are always filled a thousand and one Easter eggs.
4013	903	Rebecca has planned to reveal a really surprising Halloween Easter egg for their kids.
4014	904	After earning my degree, I’m at a crossroads. I need to figure out which direction my life should take.
4015	904	As a company, we’re at a crossroads. We can continue business as usual, or we can take a risk and try to grow.
4016	904	Sounds like you’re at a crossroads, honey. Either you break up with Todd and stay here for your dream job, or you move with him to San Francisco so he can take his own dream job.
4017	905	I’m afraid we’ve sold our soul to the devil by agreeing to this partnership. It will keep us in business, but at what cost to our clients?
4018	905	Don’t sell your soul to get to the top, or else you’ll find yourself all alone there.
4019	905	As the Co-operative movement approaches its 150th anniversary, has it sold its soul to commercial pressures?
4020	905	His devoted fans thought he had sold his soul to the devil producing such commercial music.
4021	905	He’d sell his soul to get that job.
4022	906	When looked at head-to-head, these two players really bring similar defensive abilities to our team.
4023	906	I’m going head-to-head against last year’s spelling bee champion, of course I’m nervous!
4024	906	I’m looking at the two job offers head-to-head, and I still can’t make a decision!
4025	906	They have just begun a third session of head to head talks which are expected to last until late afternoon.
4026	906	The photo showed the two leaders talking head-to-head.
4027	906	Next time you have a head-to-head with someone in authority, watch your language.
4028	906	They are set to meet head-to-head in next week’s final.
4029	907	The journalist moved hand to hand among the crowd of protesters to get a better sense of their varied concerns.
4030	907	The Internet has transformed bullying from a hand-to-hand act to one done from a distance.
4031	907	Why couldn’t you just come to me directly? When messages go from hand to hand, they are bound to get distorted.
4032	908	The robber waved his gun and shouted, "Get back, or I’ll blow you to kingdom come!"
4033	908	The enemy’s mounted machine gun blew the infantry to kingdom come.
4034	908	I’ve heard there are still landmines around here, so we’ll have to be careful. One wrong step will blow us to kingdom come!
4035	908	If we blow these rocks to kingdom come, we should be able to rescue the trapped hikers from the cave.
4036	908	I wish I could still go visit our old family home, but the demolition crew has already blown it to kingdom come.
4037	908	Once the gunpowder ignited, it blew the entire ship to kingdom come.
4038	908	You’d better get that gas leak fixed or it will blow you and your car to kingdom come.
4039	908	She couldn’t shoot freely for fear of blowing herself to kingdom come.
4040	908	She remembered him blowing the cliff to kingdom come without a moment’s fear.
4041	908	We bombed the country from here to kingdom come.
4042	909	At the age of 60, your grandmother looks fantastic! She must have discovered the fountain of youth.
4043	909	The way they advertise these skincare products makes you think each one is the fountain of youth or something.
4044	909	I’m 80 years old, I have wrinkles, and I really don’t care at this point. Who needs the fountain of youth?
4045	910	That sort of head in the clouds thinking is not getting us any closer to a workable solution.
4046	911	You need to rein in your journalists. They can’t be writing such inflammatory pieces.
4047	911	I’m trying to rein in my enthusiasm a bit, because I don’t want to be disappointed.
4048	912	We did our best to keep Sarah from finding out the party to no avail.
4049	912	All my protesting over the decision to fire Jeff was to no avail.
4050	912	All of my efforts were to no avail.
4051	912	Everything I did to help was of no avail. Nothing worked.
4052	912	The doctors tried everything to keep him alive but to no avail.
4053	913	Kate is willing to pay full price for an expensive handbag, but I just can’t wrap my head around that.
4239	951	As it turned out, he’s not just a loose cannon. He makes sense.
4054	913	Sam tries to wrap her head around snow and freezing temperatures, but she’s always lived in Florida, so real winter is not something she has experienced.
4055	914	There’s a fork in the road up ahead—which way should I go?
4056	914	OK, keep going straight until you reach the fork in the road, then turn right.
4057	914	The man at the gas station didn’t say anything about a fork in the road, though! Am I supposed to turn left or right?
4058	914	After college, I was at a real fork in the road. Should I try to find work right away, or should I got back to school to pursue a master’s degree?
4059	914	We ran into something of a fork in a road in the middle of development. Do we listen to early user feedback and completely overhaul the game’s design, or do we stick with our original plan and release the game on schedule?
4060	914	They’re definitely at a fork in the road in their marriage if they’re actively discussing separation.
4061	915	Fill me in—what happened at the party last night?
4062	915	The weekly newsletter is intended to fill in everyone about company policy, but no one reads it.
4063	915	A: "How was the meeting?" B: "Eh, it was fine—I’ll fill you in later."
4064	915	Please fill me in on what happened last night.
4065	915	Please fill in the committee on the details.
4066	916	I’m going to be putting work stuff on the back burner for a while once my son is born.
4067	916	I think we should put painting the house on the back burner until we decide on what furniture we want to buy.
4068	917	I thought I had waterproofed the windows, but rain keeps trickling in.
4069	917	He noticed seawater trickling into the hull of the boat.
4070	917	Students were still trickling in nearly 15 minutes after the lecture began.
4071	917	Once we get a bit of cash trickling in, we can start buying better equipment.
4072	917	Some of the rainwater trickled into my car through a leak. It trickled in during the night.
4073	917	The audience trickled into the hall little by little. They trickled in over a period of an hour or more.
4074	918	The game begins with 100 contestants who are slowly eliminated over time. The last person standing is the winner.
4075	918	She was the last woman standing in the writing competition.
4076	918	Of all the politicians vying for the candidacy during the primaries, no one expected him to be the last man standing.
4077	919	Put a cork in it, you two! I don’t want to hear any more arguing until we get to Grandma’s house.
4078	920	Let’s talk about it, John. You shouldn’t bottle it up.
4079	920	Don’t bottle up your problems. It’s better to talk them out.
4080	920	Don’t bottle it up inside you.
4081	920	Don’t bottle up all your feelings.
4082	920	We will need an hour to bottle up the apple juice. After the wine is fully fermented, we bottle it up and let it age.
4083	920	If you keep bottling up what you’re thinking, we’ll never be able to help you. I was angry, but I bottled my feelings up.
4084	921	Janet was woman of the hour at the office after securing the biggest customer their business had ever had.
4085	921	Ruth: "Hey, what’s going on here?" Dave: "It’s a surprise birthday party for you, Ruth! You’re the woman of the hour!"
4086	921	After writing that bombshell exposé about corruption in Washington, Jake was the man of the hour.
4087	922	In an effort to start off on the right foot this semester, I’ve already begun to research for my thesis.
4088	922	Share your feelings, both positive and negative. If you decide to go ahead, you will be starting off on the right foot.
4089	922	In order to get off on the right foot, he presented her with a couple of expensive front-row tickets for the show.
4090	922	I seem to have got off on the wrong foot with the new boss.
4091	923	I know we’ve had quite a few losses this season, but let’s win this last game and end on a high note!
4092	923	After winning the Oscar, she decided to end her acting career on a high note.
4093	923	The CEO ended his speech at the Annual General Meeting on quite a high note when he announced that there would be a company-wide bonus at the end of the year.
4094	924	They’re all scratching their heads over his decision to pull the plug on the lucrative program.
4095	924	Do you know why Kourtney suddenly quit the tennis team? I’m scratching my head over it because she’s such a talented player!
4096	924	Well, yeah, I’m scratching my head! Why would you turn down such a great opportunity?
4097	925	In his mind’s eye, he can imagine the effect he’s having.
4098	926	We had only planned to paint one room over the weekend, but we went to town and wound up painting the whole upstairs instead!
4099	926	I’d gone to town on that report for two days straight when my computer suddenly crashed and wiped out half my work!
4100	926	I have a hard time writing consistently because I can only go to town when I’ve had a flash of inspiration.
4101	926	The kids sure went to town on those cupcakes—there’s none left.
4102	926	They all just turned 21—why are you surprised they went to town on alcoholic beverages at the barbecue?
4103	926	You really went to town planning your daughter’s birthday party. Pony rides and everything, wow!
4104	926	Look at all those ants working. They are really going to town.
4105	926	Come on, you guys. Let’s go to town. We have to finish this job before noon.
4106	926	You could really go to town and give her a night at the Sheraton at the Mother’s Day rate of $120.
4107	926	I felt I could go to town a bit more in here as it’s a room we only use on special occasions.
4108	926	French people also go to town on food for this special day.
4109	926	The author resists the temptation to go to town on the details of the murder.
4110	926	She decided to go to town and redecorate all the rooms in the house.
4111	926	The main office is really going to town on collecting overdue payments.
4112	927	My Las Vegas trip was short-lived—I blew my load at the poker table in the first two hours!
4113	927	Here’s $20 for the weekend, don’t blow your whole load tonight.
4114	927	Why is it that so many lottery winners blow their load and end up penniless?
4115	927	I was mortified, but at least my girlfriend was nice about it: "It’s not a big deal—plenty of men blow their load, uh, ahead of schedule."
4116	927	Don’t blow your load, we’ll get there soon.
4117	927	The game is in 30 minutes. I know you’re nervous, but stay sharp, don’t blow your load now.
4118	927	A: "Don’t blow your load and become a stammering fool in the interview, OK?" B: "Gee, thanks for the words of encouragement."
4119	928	A: "Do you want to try driving my car, to see how you like it?" B: "Yeah, sure, I’ll give it a shot."
4120	928	I don’t usually like hot tea, but it’s so cold out that I gave it a shot today.
4121	928	Oh, you’ll probably be good at it! Just give it a shot.
4122	929	My little brother has been following me around all day. I need to shake him off.
4123	929	He had a hard time shaking off the feeling that someone was spying on him.
4124	930	Hey, kids, shake a leg! You’re going to be late for school!
4125	930	I want to get there before sundown, so let’s shake a leg.
4126	930	I loved to shake a leg when I was younger, but I don’t have the energy for it anymore.
4127	930	Let’s shake a leg, you guys. We gotta be there in twenty minutes. She told me to shake a leg, so I hurried the best I could.
4128	930	Let’s shake a leg. The music’s great. Hey, Jill! You wanna shake a leg with me?
4129	930	Shake a leg. We’re outta here.
4130	930	Come on, shake a leg or we’ll be late!
4131	930	Let’s shake a leg, you guys. We gotta be there in twenty minutes.
4132	930	Let’s shake a leg. The music’s great.
4133	931	I’m sorry, I’ve got too much on my plate at the moment to help with your project.
4134	931	We had an extremely busy period just before the holidays, but our plate is pretty clear now.
4135	931	Sara told me she doesn’t have much on her plate right now, so she can help you with the mailing.
4136	932	Hey, don’t leave me hanging—did you get the job or not?
4137	932	The consultants were supposed to deliver the report last week, but they’ve kind of left us hanging.
4138	932	The ladder collapsed and left me hanging in midair. Fortunately, I grabbed onto the windowsill.
4139	932	She left her sentence hanging in midair.
4140	932	Tell me the rest of the story. Don’t leave me hanging in midair.
4141	933	A: "I just wish I was earning a little bit more money than I do now." B: "Well, if wishes were horses, beggars would ride."
4142	933	The president said he wishes the country would be more united on this issue, but if wishes were horses, then beggars would ride.
4143	933	Jill: If I were Queen of the World, I would make sure that everyone had enough to eat. Jane: And if wishes were horses, then beggars would ride.
4144	933	Alan: I sure wish I had one of those expensive cameras. Jane: If wishes were horses, then beggars would ride.
4145	934	Oh, that idea from last week’s meeting is dead in the water now that the CEO has vetoed it.
4146	934	Good luck getting a refund from that company—it seems to be dead in the water these days.
4147	934	His mayoral campaign is likely dead in the water now, thanks to this exposé about his shady business dealings.
4148	934	This whole company is dead in the water.
4149	934	The project is out of funds and dead in the water for the time being.
4150	934	I think for all practical purposes, the talks are now dead in the water.
4151	934	One backbench Tory MP said last night: "It looks as if he is dead in the water now."
4152	934	Well, they are hardly dead in the water, having sold three million copies of Be Here Now.
4153	934	Now the scandal is out, his leadership campaign is dead in the water.
4154	934	The project is dead in the water for the time being.
4155	934	The crippled ship was dead in the water. With no leadership, the project was dead in the water.
4156	935	I want every one of you shaking your tail feather by the end of the night! It’s my wedding, so I will drag you on to the dance floor if I need to.
4157	936	Oh man, the boss found out that messed up the budget report, and now I have egg on my face.
4158	936	Sally was left with egg on her face after forgetting the words to the song during her audition.
4159	936	I sure had egg on my face when I found out my date was a staunch animal rights advocate—after I’d already ordered veal.
4160	936	There’s no point in making predictions, because all too often you end up with egg on your face.
4161	936	A recent public relations disaster left the company with egg all over its face.
4162	936	Let’s think this out carefully. I don’t want to end up with egg on my face.
4163	937	Ever since my sister heard about climate change, she’s had a bee in her bonnet about recycling.
4164	937	John has a bee in his bonnet about the new dress code policy at work.
4165	937	Don’t mind her; she’s just got a bee in her bonnet about her upcoming move out of state.
4166	937	Wow. He’s got a real bee in his bonnet over the election results.
4167	937	I can’t focus; I’ve got this bee in my bonnet about my publishing project.
4168	937	My mom has a bee in her bonnet about me getting a job at fifteen, but I really want my own spending money.
4169	937	Why do you have such a bee in your bonnet over that comment she made?
4170	937	She’s got a bee in her bonnet about healthy eating lately.
4171	937	You’ve had a bee in your bonnet about this all day; let it go, for Pete’s sake!
4172	937	Ever since the meeting, she’s had a bee in her bonnet about team productivity, and it’s driving everyone in the office crazy.
4173	938	Joshua started throwing a tantrum this afternoon, and with all the other things I have to get done, I’ve just reached the end of my rope!
4174	938	You’re taking on too many responsibilities in the office. You need to slow down before you reach to the end of your rope.
4175	939	He brings years of leadership experience to the table.
4176	939	When you’re writing your résumé, you need to make sure you highlight what great things you’ll be bringing to the table.
4177	939	The company is touting this new smartphone as its most revolutionary product yet, but it really doesn’t bring anything to the table that we haven’t already seen before.
4178	940	Just take out the trash like Dad asked you to—you’ll get in trouble if you give him any lip.
4179	940	Did you just give me some lip? OK, that’s it, go to your room!
4180	940	Why would you give the principal any lip? That’s just stupid, dude.
4181	941	She seemed so surprised by the news that it must have come out of the blue.
4182	941	Then, out of the blue, a solicitor’s letter arrived.
4183	941	Turner’s resignation came out of the blue after his team’s shock 5-0 defeat at Portsmouth.
4184	941	Can the disease really strike out of the blue?
4185	941	She had no idea that anything was wrong until he announced out of the blue that he wanted a divorce.
4186	942	I’ve been studying night and day to get ready for this test.
4187	942	Her transformation has really been night and day. She doesn’t even look like the same person.
4188	942	A: "Have you seen any improvement in his behavior?" B: "Oh, it’s like night and day. He’s been a model student this month."
4189	942	She worked night and day on the report until it was finished.
4190	943	You won’t know unless you try. If you build it, they will come.
4191	943	If you build it, they will come. Trust me; I’ve done it before.
4192	943	I know it’s a lot to give up, but if you build it, they will come.
4193	943	If you build it, they will come. I say that all the time when I know that I’m chasing my dreams.
4194	943	It won’t happen overnight, but if you build it, they will come.
4195	943	You know that if you build it, they will come. Don’t waste your time doing something you hate.
4196	943	We believe that if you build it, they will come to this company.
4197	943	There are no wrong ideas or answers here. If you build it, they will come.
4198	943	I need to start dreaming bigger. I heard that If you build it, they will come.
4199	943	Where is that phrase if you build it, they will come from, anyway? It means a lot to me!
4200	944	My friends and I had some time to kill, so we got the bus and rode out to the mall for a few hours.
4201	944	He rode out of the camp on a tiny little donkey that could barely stay upright.
4202	944	You could try to ride it out, but I think you’re better off dealing with the scandal up front.
4203	944	We went down to my uncle’s underground shelter to ride out the storm.
4204	944	It was a nasty situation, but the mayor tried to ride it out. The mayor decided to ride out the scandal.
4205	944	All the racers rode out of the starting area and began the bicycle marathon. At the sound of the starting gun, all the contestants rode out.
4206	944	The doctor rode out to the ranch to check on his patient. I just rode out here from Cincinnati on the bus. The cowboy rode out of town on a large black horse.
4207	944	I rode out the war as a nurse. Many people left before the storm, but we stayed and rode it out. Only two companies managed to ride out the depression—all the rest went bankrupt.
4208	945	She went to the ends of the earth for this company, and they didn’t even have the decency to give her a severance package when they let her go.
4209	945	That no-good cheat robbed me of my inheritance, and I’ll go to the ends of the Earth to get it back.
4210	945	If your daughter finds out that you hate her boyfriend, she’ll be even more driven to go to the ends of the Earth to be with him.
4211	946	You may have walked away from your drunk driving accident unscathed, but you have that poor boy’s blood on your hands.
4212	946	The police now have blood on their hands after their crackdown on protesters turned violent.
4213	947	The IRS has been sending me tax refunds by mistake for years, but I’ve never said anything to them about it. It’s my own private little way of sticking it to the man.
4214	947	The news reporter, under pressure from his bosses to only report the censored version of events, decided to stick it to the man and share the story in its entirety live on the air.
4215	948	The computer crashed so badly that the only thing I could do was pull the plug.
4216	948	She pulled the plug on the vacuum cleaner because I couldn’t hear what she was saying.
4217	948	The new president pulled the plug on several of his predecessor’s programs as soon as he took office.
4218	948	They pulled the plug because they felt our department wasn’t an important part of the business.
4219	948	Despite many objections, the court ruled that the family could pull the plug.
4220	948	I’ve instructed my family to pull the plug on me if I ever become brain dead.
4221	948	They had to get a court order to pull the plug on their father.
4222	948	Fred signed a living will making it possible to pull the plug on him without a court order.
4223	948	The mayor was doing a fine job until the treasurer pulled the plug on him.
4224	948	David pulled the plug on Fred, who was taking too long with the project.
4225	948	While she was working at the computer, I accidentally pulled the plug.
4226	948	I pulled the plug on the vacuum because the switch was broken.
4227	948	Jane pulled the plug on the whole project.
4228	948	The treasurer pulled the plug because there was no more money in the budget.
4229	948	And with the first elements of the ISS set for launch next year, it’s hardly likely Congress will pull the plug on the project.
4230	949	I hate Dave’s new boyfriend, he’s always trying to push my buttons, and he’s doing a good job of it!
4231	949	No one will be able to push your buttons like your children, but it’s all a part of the adventure of parenthood.
4232	949	A guy who knows how to cook really pushes my buttons.
4233	949	I almost never lose my temper, but this guy can really push my buttons.
4234	949	I’ve known him for years, but I still don’t really know what pushes his buttons.
4235	950	The politician is waiting to see which way the wind blows regarding public opinion on the issue before deciding how to take action.
4236	950	It looks like I might be considered for the job, but I’m waiting to see which way the wind blows.
4237	951	You really have to be mindful of what you say to Jake. He’s a loose cannon, and the smallest things will send him into a fit of rage.
4238	951	The star quarterback’s reputation as a loose cannon hurt his chances of being signed by a new team.
4240	951	Some loose cannon in the State Department has been leaking stories to the press.
4241	951	He was also getting a reputation for being a loose cannon; an accident waiting to happen.
4242	951	Thomson can be a loose cannon—he’s not easy to control.
4243	951	He has a reputation as a loose cannon whose comments sometimes upset Wall Street.
4244	952	I’m nervous about the trial, but I’m glad I have you in my corner.
4245	952	I feel a little bad that he’s going into the meeting with no one in his corner.
4246	953	If you are so serious that you can’t take the piss out of yourself every once in a while, you’re going to have a hard time enjoying most of life.
4247	953	It really hurt Steph’s feelings to know that the group had been taking the piss out of her that whole time.
4248	953	Brian was a bit of a troublesome student and tended to take the piss whenever class began.
4249	954	The team has been on fire lately, winning 11 of its last 12 games.
4250	954	I was worried that Sarah wouldn’t be able to handled the advanced math class that we moved her into, but she’s been on fire this whole semester.
4251	955	She calmly clapped back at critics by asserting that her weight is none of their business.
4252	955	I’m not proud of it, but I did clap back at the girl who stole my boyfriend by starting a vicious rumor about her.
4253	955	If she thinks I’m too nice to clap back about the awful things she’s said, she is in for a rude awakening!
4254	955	I’m not great at the clap back because I get easily flustered by criticism.
4255	955	Her clap back was a vicious rumor targeting the girl that stole her boyfriend.
4256	955	Whew, that was an epic clap back. No one’s gonna be picking on that kid again any time soon!
4257	956	I think I see smoke coming from the warehouse. Someone run upstairs and sound the alarm!
4258	956	A number of top economic advisors tried to sound the alarm before the economic crash, but no policy makers seemed to heed their warnings.
4259	957	I know you’re disappointed that you didn’t come in first, but so many other incredible things have happened to you this year. Count your blessings, my darling.
4260	957	I try to count my blessings every day—it’s a great antidote to sadness!
4261	957	I survived a really bad car accident last summer, so all I can do is count my blessings, man.
4262	957	At forty you ruminate. Mostly about life and what it has done to you. At forty you count your blessings. And accept the bitter dollops that have been flung your way.
4263	957	Stop looking so miserable and count your blessings! At least you’ve still got a job and somewhere to live.
4264	958	Let’s see what I have in my bag of tricks to entertain the baby.
4265	958	Do you have any ideas for how I can get the dog to come outside in the rain? Treats and toys didn’t work, and that’s all I had in my bag of tricks.
4266	958	You need a whole bag of tricks on hand when you’re flying with a toddler.
4267	958	Our new pitcher has a killer fastball in her bag of tricks.
4268	958	She’s an ace negotiator, so you know she has a few more surprises in her bag of tricks.
4269	958	The legal team used their whole bag of tricks, but in the end they weren’t able to prevent a guilty verdict.
4270	958	What have you got in your bag of tricks that could help me with this problem?
4271	958	Here comes Mother with her bag of tricks. I’m sure she can help us.
4272	958	Made in ’98, this is a great film with the director going through his bag of tricks to brilliant effect.
4273	958	Let’s see what he can pull out of his bag of tricks in tonight’s match.
4274	958	Hotel managers are using a whole new bag of tricks to attract their guests.
4275	959	She really went out on a limb with that hypothesis—the facts don’t support it at all.
4276	959	That politician went out on a limb and publicly questioned the views of his party.
4277	959	I don’t think I’m going out on a limb by saying that everyone will like that idea.
4278	959	He does not want to go out on a limb and try something completely new.
4279	959	There’s nothing wrong with politicians going out on a limb sometimes and risking their reputation.
4280	960	Many people believe that a glass ceiling exists within the tech industry because not many women hold prominent positions in the field.
4281	960	The senator is aiming to break the biggest glass ceiling in the world with her bid to become the President of the United States of America.
4282	960	You think there’s no glass ceiling here? OK, then why do none of the male board members listen to me in meetings?
4283	960	At the age of 43 she became the highest ranking woman officer in the country, only to find she’d hit the glass ceiling.
4284	960	A woman judge has at last succeeded in breaking through the glass ceiling into the Court of Appeal, the second highest court in the land.
4285	962	The program is very smooth and intuitive for the end user, but it’s actually incredibly complex if you look under the hood.
4286	962	A: "My computer has been really slow ever since its latest update." B: "Let me look under the hood—you might need to install some more RAM."
4287	962	Once I started looking under the hood of the administration, I began to notice a pattern of corruption that was impossible to deny or ignore.
4288	962	While technically a charity, if you look under the hood you’ll see an intricate web of shell companies designed to net the CEOs an exorbitant profit.
4289	963	I knew I wouldn’t be able to write 50 pages in one night, so I’ve been chipping away at this paper for a few weeks.
4290	963	Try not to get too overwhelmed about cleaning the house and just chip away at it one room at a time.
4291	963	Whew! I had to chip at it for a week, but I finally cleared out all those unread emails!
4292	964	Well, I haven’t fixed a motor in nearly 10 years, but I’ll certainly make a try at it.
4293	964	You had your chance, now let your brother have a try at breaking the piñata.
4294	964	Give Sarah a try at the equation. I bet she can solve it!
4295	964	Watching him smile that smug, self-important smile, I thought to myself how much I’d love to have a try at him—one on one, with nothing but our fists!
4416	981	I’ve stayed in touch with some of my university friends.
4296	964	A: "This doesn’t seem like any ordinary thief. He’s always one step ahead of us." B: "Give me a try at him, Chief. I think I can bring him in."
4297	964	She made a name for herself as one of the best racers in the world in the span of just one year. Now, every professional worth their salt wants a try at her.
4298	964	Let me have a crack at him. I can make him talk. Let the new teacher have a try at Billy. She can do marvels with unwilling learners. Give me a crack at him. I know how to make these bums talk.
4299	964	All of us wanted to have a try at the prize-winning shot. Let Sally have a shot at it. If you let me have a crack at it, maybe I can be successful.
4300	965	They’ve been planting the seeds of their own downfall with their anti-consumer practices over the last few years.
4301	965	The over-zealous policing of opposing opinions has planted the seeds of discontent among the population.
4302	965	What first planted the seeds of doubt in your mind?
4303	965	The seeds of conflict were sown when oil was discovered on the border between the two countries.
4304	966	I’m confident that our new CEO will just hit the ground running once she starts here.
4305	966	A decade ago I had a lot more energy. I would wake up, hit the ground running, and never stop until I went to bed again.
4306	966	We need someone who is fully trained and can hit the ground running.
4307	966	She’s in excellent shape and in good spirits. She’ll hit the ground running when she gets back.
4308	966	Some targets move too fast, even for a government that makes it clear it has hit the ground running.
4309	966	What we need for this project is someone who will hit the ground running.
4310	967	We were so lucky to avoid that massive accident—we might have bitten the dust!
4311	967	A: "Yikes, why did I think Ed had already bitten the dust?" B: "Probably because he’s about 100 years old?"
4312	967	My mom is terrified of flying because she’s convinced that’s how she’ll bite the dust.
4313	967	Judging by all that noise coming from her car, I’m pretty sure it’s about to bite the dust.
4314	967	I have to go buy a new blender because mine bit the dust today.
4315	967	The company could end up biting the dust if their new product turns out to be a flop.
4316	967	Sadly, it doesn’t take long for the latest technological innovations to bite the dust.
4317	967	Don’t even bother getting the latest model of smartphone—those things bite the dust in no time.
4318	967	I thought record players had bitten the dust, but my teen daughters just love mine.
4319	967	A shot rang out, and another cowboy bit the dust.
4320	967	The soldier was too young to bite the dust.
4321	967	My old car finally bit the dust.
4322	967	This pen is out of ink and has bitten the dust.
4323	967	With the news that milk chocolate can help cut cholesterol, yet another healthy eating fad bites the dust.
4324	967	Quite a few restaurants have bitten the dust recently.
4325	967	A Wild West showman nearly bit the dust when he blew himself up making blank bullets in his garden shed.
4326	967	Thousands of small businesses bite the dust every year.
4327	968	Do you think you can pull off this deal?
4328	968	The team pulled off a last-minute victory after being down 15 points at halftime. We didn’t think we could complete the project before the deadline, but somehow we pulled it off.
4329	968	It takes a lot of skill to pull off something like that.
4330	969	I just can’t stand Dean’s voice, so everything he says gets under my skin.
4331	969	Why do you let your brother get under your skin like that? I bet he’d stop antagonizing you if you didn’t react to him.
4332	969	Don’t worry, it’s only Thanksgiving morning—plenty of time left for the family to get under your skin!
4333	969	I can’t get that beautiful girl I met earlier off my mind. She’s just gotten under my skin.
4334	969	I know this level has gotten under your skin, but you just keep dying. Why not take a break and come back to the game a little later?
4335	969	When you’re a collector, it gets under your skin when you realize there’s a piece out there that you don’t have.
4336	969	A: "How did you know he would make that decision?" B: "Oh, I feel like I’ve gotten under his skin since we’ve been spending so much time together lately."
4337	969	The documentary filmmaker likes to get under his subjects’ skin long before the filming process actually begins.
4338	969	I was hoping to get under the singer’s skin, but the special on her was pretty superficial, unfortunately.
4339	969	The continuing criticism is starting to get under his skin.
4340	969	Try not to let his comments get under your skin.
4341	969	After a couple of episodes, the characters start to get under your skin.
4342	970	Some senior employees are unhappy that the new dress code applies to everyone across the board.
4343	970	The politician is expected to call for tax increases across the board.
4344	970	A: "I assume this will mean a higher tax rate for both companies?" B: "Yes, that’s right. We’re expecting a 15% increase across the board."
4345	970	I think we’ll have a great trip across the country; we’ve got places all over the board we want to visit.
4346	970	I love how people from cities all over the board make their way to this bar for a drink.
4347	970	My sister loves traveling to exotic locations all over the board, whereas I’ve never left the US.
4348	970	The shop is all over the board as to what you can buy there.
4349	970	Public opinion is all over the board for the governor, so it’s hard to know how she’ll do in the next election.
4350	970	You’ll definitely appeal to a wide variety of consumers if your offerings are all over the board.
4351	970	Mary is all over the board with her plans for the future. I wish she would just pick something and stick to it!
4352	970	I tried to get a sense of John’s plan for the project, but he seems all over the board with it.
4353	970	What exactly am I supposed to be doing? The instructions I’ve gotten have been all over the board.
4354	970	The school board raised the pay of all the teachers across the board.
4355	970	It seems that across the board all shops have cut back on staff.
4356	970	This proposal will reduce funding across the board for community development grants, student loans and summer schools.
4357	970	There is an across-the-board increase in the amount of meat eaten by children.
4358	970	The decline for the euro across the board was mainly attributed to the further erosion of global investors’ confidence toward the euro-zone economy.
4359	970	The government claims that standards in education have fallen right across the board.
4360	970	The union demanded an across-the-board salary increase.
4361	970	raised taxes across the board.
4362	971	The purpose of this seminar is to brainstorm a variety of different ideas, choose the best one, then take the ball and run with it.
4363	971	Don’t be so passive in your role—if you have a good idea, there’s no harm in taking the ball and running.
4364	972	The government came to terms after the rebels’ unflinching siege of the king’s palace.
4365	972	The townspeople will only come to terms if they believe that I have their best interests at heart.
4366	972	A: "Sir, the members of your squad are all out of control." B: "Where’s my sword? I’ll get them to come to terms."
4367	972	I should have the report ready for you by this afternoon, I just need to come to terms with this new software update first.
4368	972	I’ve tried, but I just can’t come to terms with Amy, she’s totally out of control!
4369	972	She’s been living in Alaska for four years, but she still can’t come to terms with how cold it gets here each winter.
4370	972	I finally came to terms with my lawyer about his fee.
4371	972	Bob, you have to come to terms with your father.
4372	972	She had to come to terms with the loss of her sight.
4373	972	She couldn’t come to terms with her estranged husband.
4374	972	Ed and Alice came to terms about money.
4375	972	They did not come to terms on the price.
4376	973	During the intermission, you guys need to set the stage for the first scene of act two.
4377	973	Their squabbling at Thanksgiving set the stage for a total screaming match on Christmas.
4378	973	A positive conversation with the CEO today could set the stage for a promotion tomorrow.
4379	973	The stage crew set the stage for the first act. They set the stage for the second scene while the orchestra played.
4380	973	The initial meeting set the stage for further negotiations. Your negative comments set the stage for another big argument.
4381	973	Jamaica’s prime minister set the stage for an election this month by announcing candidates for his People’s National Party.
4382	973	The agreement sets the stage for renewed talks.
4383	973	The stage is now set for economic recovery.
4384	973	Udall had ruffled uniforms, but he had also set the stage for the glory years of the agency.
4385	974	Twitter users were quick to put the politician on blast for his racist comments.
4386	975	I will only sell the house if the buyer’s offer is in the ballpark of the price I want to get.
4387	975	No, the salary isn’t as high as I had hoped, but I accepted it because it’s in the ballpark at least.
4388	975	Your estimate is not even in the ballpark. Please try again.
4389	975	General manager J. P. Taylor received some offers, but none of them was in the ballpark.
4390	975	We estimate that a four-year undergraduate degree will cost in the ballpark of $57,000 by 2020.
4391	975	Doctor Adams pointed out that it cost about £5—an underestimate, maybe, but in the right ballpark.
4392	976	Instead of trying to hide from your fame, why don’t you try leaning into it a bit more? You’d probably enjoy life more if you did.
4393	976	The breakup still hurts, but after being in a relationship for so long, I’m finally starting to lean into being single.
4394	977	She was going to take that job offer in California, but after thinking about how much she would miss her friends and family in Delaware, she had a change of heart.
4395	977	A: "I know you think Pete’s a doofus, but don’t doubt the sincerity of his affection for me." B: "Actually, I’ve had a change of heart after seeing how well he treats you."
4396	977	Yeah, we did end up staying at a hotel. We were planning to drive through the night, but exhaustion made us have a change of heart.
4397	978	The military uses stringent standards to weed out unqualified enlistees.
4398	978	We need to weed all of these bugs out before we go live.
4399	978	We had to weed the less productive workers out one by one. The auditions were held to weed out the actors with the least ability. I’m going through my books to weed out those that I don’t need anymore.
4400	978	We weeded out the clover. The gardener weeded the dandelions out.
4401	978	The interviewers weeded out most of the applicants. The coach weeded the weaker players out.
4402	979	With so many people applying for a limited number of jobs, employers have had to cull the herd by introducing much stricter criteria and a more elaborate application for hiring.
4403	979	Universities have long used standardized test results as a means of culling the herd of applicants they receive each year.
4404	979	We were so determined to win the science bowl that we culled the herd beforehand. Anyone susceptible to stage fright had to go!
4405	980	The end of that trick always throws the audience for a loop. I love watching their faces as they desperately try to figure it out.
4406	980	It really threw Stu for a loop when Olivia announced she was leaving the company.
4407	981	My old high school friends and I tried keeping in touch once we graduated, but we all started drifting apart once college got underway.
4408	981	Now, make sure you keep in touch. I want to hear all about your time in Paris!
4409	981	OK, Deborah, thank you for your audition. Keep in touch!
4410	981	It was so good to see you again, cousin Jeb—keep in touch!
4411	981	After my neighbor moved, we still remained in touch.
4412	981	I want to stay in touch with my office over the someone or something, in any combination weekend.
4413	981	Nice talking to you. Keep in touch.
4414	981	Sorry, we can’t use you anymore. Keep in touch.
4415	981	We are in touch with our central office every day.
4417	983	Mike and Timothy are a match made in heaven! I can’t think of two people better suited to marry one another.
4418	983	The new wide receiver and the team’s veteran quarterback have proved to be a match made in heaven on the field.
4419	983	When Kelly and Julie partnered up and opened their restaurant, it was a match made in heaven.
4420	983	Cindy and Mark look so happy together. That’s a marriage made in heaven.
4421	983	Merging our bakery with the ice cream parlor next door was a great idea—it’s a marriage made in heaven.
4422	983	The partnership of George and Ira Gershwin was a match made in heaven; they wrote such beautiful songs.
4423	983	When she married Dave, everyone thought that theirs was a match made in heaven.
4424	983	A merger between the two leading mobile phone networks would appear to be a marriage made in heaven, but will consumers lose out?
4425	984	What is the bottom line for this quarter?
4426	984	You have all made compelling arguments, but the bottom line is that we need a viable, cost-effective solution, and I still don’t think we’ve found one yet.
4427	984	These large corporations are only driven by the bottom line. They couldn’t care less whether their product is durable.
4428	984	What’s the bottom line? How much do I owe you?
4429	984	Don’t tell me all those figures! Just tell me the bottom line.
4430	984	I know about all the problems, but what is the bottom line? What will happen?
4431	984	The bottom line is that you have to go to the meeting because no one else can.
4432	985	Our art and marketing departments always work hand in glove to make sure all the campaigns are consistently designed.
4433	985	It turns out that the doctor and the pharmaceutical company have been hand in glove for years, conspiring together to push expensive medications on patients regardless of their actual need.
4434	985	It’s very clear that these senators are hand in glove with the major corporations who donate to their campaigns.
4435	985	John is really hand in glove with Sally.
4436	985	The teacher and the principal work hand in glove.
4437	985	Many of the city’s politicians are hand in glove with smugglers.
4438	985	Employment on the building sites is controlled by more than 40 gangs, who are believed to be hand in glove with the police.
4439	985	The terrorists are working hand in glove with the drug traffickers.
4440	985	They are hand in glove with the secret police.
4441	985	These two go hand-in-glove.
4442	986	Please don’t wind the kids up right before bedtime.
4443	987	Ever since that break-in, they’ve really ramped up security at the office.
4444	987	You need to seriously ramp up your study efforts if you want to get an A on this exam.
4445	987	The factory must ramp up production due to increased demand for its products. I added a new card to my computer memory to ramp it up.
4446	988	A: "It’s interesting the way Hemingway portrays Lady Brett Ashley doing things more traditionally associated with men, such as frequenting bars and having sex with various partners." B: "Absolutely. To piggyback off of what you’re saying, I think the character can actually be read as a symbol of the feminist ideal of the New Woman."
4447	988	They’re not really your friends—they’re just trying to piggyback off your success so they can launch their own careers.
4448	989	You’ll need to thread the needle before you can start sewing.
4449	989	The quarterback really threaded the needle between those two defenders with that pass.
4450	989	Come on, we’re playing thread the needle! Everyone hold hands.
4451	989	I always feel such a release of tension in my shoulders and spine when we do thread the needle.
4452	990	Jumping off the high-dive is fun! Don’t chicken out!
4453	990	I didn’t chicken out, I just changed my mind, OK?
4454	990	I knew John would chicken out on us—his tough-guy persona is just an act.
4455	990	Come on! Don’t chicken out now!
4456	990	Freddy chickened out of the plan at the last minute.
4457	990	My friends dared me to jump into the pond, but I chickened out and climbed down from the tree.
4458	991	You need to calm down before you talk to Larry. You don’t want to lose your head before finding out his side of the story.
4459	991	I’m sorry, I lost my head out there. There’s no excuse for what I said.
4460	991	He warned the party not to lose its head, saying that it was not a "time for panic".
4461	991	When he was questioned by the police, he completely lost his head, told a number of lies and forgot to mention one or two things that might have helped him.
4462	991	It’s a very frightening situation, but we mustn’t lose our heads.
4463	992	It’s a good idea, but you should run it up the flagpole before you pitch it to the board of directors.
4464	992	A: "How do you think employees would react to this policy?" B: "Well, let’s run it up the flagpole and see who salutes."
4465	993	Aw man, our rival’s new product just came out to rave reviews. There’s another nail in the coffin.
4466	993	If my parents find out that I failed my exam, it will be another nail in the coffin, and they may never let me go out again!
4467	993	A: "Oh, and he was cheating on me too." B: "Wow, another nail in the coffin! I don’t want anything to do with this loser anymore."
4468	993	The vote is another nail in the coffin of the one-party system which the country has now largely rejected.
4469	993	The President took the blame for the crisis and it became another nail in the coffin of his leadership.
4470	993	A rent increase could be the final nail in the coffin for a small business like this.
4471	993	The marriage was already in trouble and his affair proved to be the last nail in the coffin.
4472	994	I knew I had hit rock bottom when I missed my son’s birthday party because I was so hungover. That’s when I knew I needed to get help.
4473	994	It’s been falling in price for weeks, but I think the stock has finally hit rock bottom.
4474	994	The UK motor industry had one of its worst days yesterday as new car sales hit rock bottom.
4475	994	This is a good time to buy a house. Prices have reached rock-bottom in most areas.
4476	994	Morale within the company was at rock bottom.
4478	994	When my girlfriend left me, I hit rock bottom.
4479	994	Sometimes you have to reach rock bottom before you can start to recover.
4480	994	She was at rock bottom. Her marriage was breaking up and so was she.
4481	994	Demand for new cars is at rock bottom. This month’s sales figures are the lowest in ten years.
4482	994	I really hit rock bottom after my marriage broke up.
4483	994	For rock-bottom prices, come to McArthur’s Furniture Store.
4484	995	I have an eagle eye for spotting wildlife.
4485	995	Don’t touch anything! My mom has an eagle eye when it comes to her knick-knacks being out of place.
4486	995	You have an eagle eye for highway signs in the distance—what’s that one say? Are we coming up to our exit?
4487	995	We need to get Sally’s eagle eye on this manuscript because she’ll be sure to spot any errors.
4488	995	I knew you’d pick out subtle throwbacks to other movies in the series—you’ve always had an eagle eye for that sort of thing.
4489	995	With your eagle eye, I’m not surprised you were able to spot all the differences between the two pictures.
4490	995	You need to keep an eagle eye on the kids because they will get into everything the minute you turn your back.
4491	995	Keep an eagle eye on that spider while I get something to trap it in!
4492	995	I wouldn’t keep such an eagle eye on the interns if they could be trusted to actually do their work.
4493	995	Ugh, I got a demerit because some eagle eye saw me with my shirt untucked during yesterday’s assembly.
4494	995	Sally’s an eagle eye, so have her look at your manuscript—she’ll be sure to spot any errors.
4495	995	Of course I’m an eagle eye now—I’m a mom of three small children!
4496	995	The students wrote their essays under the eagle eye of the headmaster.
4497	995	The umpire kept his eagle eye on the tennis match.
4498	995	No antiques shop, market or furniture shop escapes her eagle eye.
4499	995	Phil’s played first-class cricket for five years in England under the eagle eye of our umpires.
4500	995	You must watch builders with an eagle eye because some will cheat the minute you turn your back.
4501	995	Managers of Europe’s top clubs are keeping an eagle eye on the World Championships, hoping to snap up new talent.
4502	995	As the band were passing through security, an eagle-eyed official spotted an 18-inch knife in their luggage.
4503	995	Nothing the staff did escaped the eagle eye of the manager (= he saw everything they did).
4504	995	An eagle-eyed student spotted the mistake.
4505	995	Some old eagle-eye across the street saw me standing in the cold and called my wife who came down and let me in.
4506	995	Keep your eagle-eye trained on the entrance.
4507	996	Well, that suggestion is certainly out of left field! How did you come up with that one?
4508	996	Sure, my aunt is really wacky and often out of left field, but I love her to pieces!
4509	996	Most of your ideas are out of left field.
4510	996	All of his paintings are right out of left field.
4511	997	Don’t go off half-cocked and say something you’ll regret later.
4512	997	I’ll admit that I went off half-cocked when I sent that angry email before finding out what really happened.
4513	997	A: "Why isn’t Dave talking to you right now?" B: "It’s possible that I went off half-cocked and accused him of sabotaging my presentation."
4514	997	Do you remember last night at the bar at all? You were half-cocked.
4515	997	Well, I must have been half-cocked if I got up and did karaoke at the bar!
4516	997	Help him get home, will ya? He started drinking whiskey, and now he’s half-cocked.
4517	997	So he’s half-cocked. So what?
4518	997	He just sat there, half-cocked and singing.
4519	998	I know you two don’t see eye-to-eye, but if you really sat down and had a heart-to-heart talk, I think you’d realize you are both working toward the same goal.
4520	998	Jim sat down with his son and had a heart-to-heart about the dangers of peer pressure and drug use.
4521	999	I wouldn’t leave your car parked here overnight. It will be a sitting duck in this neighborhood, just waiting to be stolen.
4522	999	We can’t go into that area unarmed—we’d be sitting ducks!
4523	999	I felt like a sitting duck walking by myself through the park at night.
4524	999	You look like a sitting duck out there. Get in here where the enemy cannot fire at you. The senator was a sitting duck because of his unpopular position on school reform.
4525	999	A pilot performing this manoeuver would be a sitting duck for a second enemy aircraft.
4526	999	When the planes reach the sitting-duck warships, the harbour is rocked by a series of huge explosions.
4527	999	It’s always easy to criticize teachers; they’re just sitting ducks.
4528	999	Get out of the way! You’re a sitting duck.
4529	1000	We can wait until tomorrow to return this, I’d rather pay a late fee than stick my neck out driving in this snow.
4530	1000	Thank you for sticking your neck out and bringing this to me—I hope no one saw you take it.
4531	1000	I was shocked when another girl stuck her neck out for me in class and criticized the teacher for cutting me off when I was trying to give my opinion.
4532	1000	Sorry, but I’m not going to stick my neck out and lie to protect my siblings anymore.
4533	1000	Do you really think it’s wise to stick your neck out and lend your boyfriend $5,000 from your savings?
4534	1000	I’m glad I stuck my neck out and wrote directly to the CEO for a job. He called me in for an interview Tuesday.
4535	1000	My assistant is extremely loyal. She even stuck her neck out to defend me against a board member when I couldn’t be at the meeting.
4536	1000	I’m glad I stuck my neck out to propose our company establish a scholarship for underprivileged kids. We need to do more to support our community.
4537	1000	They’re asking me to stick my neck out to save them from a difficult situation again. It’s not worth the risk anymore.
4538	1000	I’ve been sticking my neck out for you for the past year and you won’t do this one favor for me?
4539	1001	The silent treatment isn’t helping the situation between you two, so just clear the air already.
4540	1001	Once we cleared the air, we found that it had just been a simple misunderstanding.
4541	1001	I know my parents are still mad at me for missing curfew, so I’m going to try to clear the air this morning by apologizing profusely.
4542	1001	They were able to clear the air by producing the document in question, so that we could all see it for ourselves.
4543	1001	The senator really needs to clear the air on this matter by finally answering reporters’ questions.
4544	1001	I know there are a lot of rumors circulating about me, so I just wanted to take a few minutes to clear the air and share the truth of the situation with everyone.
4545	1001	Open some windows and clear the air. It’s stuffy in here.
4546	1001	All right, let’s discuss this frankly. It’ll be better if we clear the air.
4547	1001	I get angry and frustrated with Hannah’s behavior, but I’m a great believer in expressing my feelings to clear the air.
4548	1001	Some groups in our community seem to suffer from discrimination. An independent inquiry could clear the air and sort out the problem.
4549	1001	Goalkeeper Edwards said that the half-time air-clearing session turned the game round..
4550	1001	He is determined to have a clear-the-air meeting with Murray this weekend.
4551	1001	Mary had been bad-tempered with me for days, so in an attempt to clear the air, I asked her what the matter was.
4552	1002	Oh, put a sock in it! No one wants to hear your complaints anymore.
4553	1002	If they don’t put a sock in it soon, I’m going to go up there and tell them to shut up.
4554	1002	Put a sock in it, all of you. I’m trying to watch TV.
4555	1002	Put a sock in it, will you? I’m on the phone.
4556	1003	I can’t put my finger on what this is reminding me of.
4557	1003	There’s something off about her story, but I can’t put my finger on it.
4558	1003	Well, I think you put your finger on it when you brought up the issue of tax increases for lower earners.
4559	1003	I put my finger on the button and pressed.
4560	1003	Put your finger on this spot and push hard.
4561	1003	That is correct! You have certainly put your finger on the problem.
4562	1003	When she mentioned money, she really put her finger on the problem.
4563	1003	He put his finger on a major weakness of its education policy when he said that the country needed improved education, not perpetual experimentation.
4564	1003	It was Dr. Stockton who had put his finger on the truth.
4565	1003	Had they known each other as children? At school? She couldn’t put her finger on it.
4566	1003	There was something about the dinette that struck him as peculiar, but he couldn’t quite put his finger on it.
4567	1003	I can’t put my finger on the person in that photograph.
4568	1003	I know his name; I just can’t put my finger on it.
4569	1004	Sara really has her finger on the pulse of nightlife in the city, so I would ask her where you should have your birthday party.
4570	1004	She had her finger on the pulse of the consumer-led Eighties generation.
4571	1004	It’s important to keep your finger on the pulse by reading all the right magazines and newspapers.
4572	1004	Hart is a businessman with his finger on the button.
4573	1004	Successful politicians need to keep their finger on the pulse of the voters.
4574	1005	If you want to get a passing grade this semester, you’ll really need to buckle down and study hard.
4575	1005	You want to win this competition? Then you’re going to have to buckle down and write the best script of your life.
4576	1005	Boys, we really need the garage cleaned out, so please buckle down on that this weekend, OK?
4577	1005	If you don’t buckle down to your job, you’ll be fired.
4578	1005	You had better buckle down and get busy.
4579	1005	I’ve wasted a lot of time, and now I have to buckle down and finish my homework.
4580	1006	Don’t worry, the storm will blow over eventually.
4581	1006	When do you think the tension between Mom and Grandma will blow over?
4582	1006	I can’t wait till the drama with this merger finally blows over.
4583	1006	Her announcement just blew me over.
4584	1006	The whole event just blew me over.
4585	1006	Her display of temper finally blew over.
4586	1006	The storm will blow over soon, I hope.
4587	1006	The hurricane blew over many large billboards. I set up a flagpole outside, but the wind blew it over.
4588	1006	The storm blew over quickly. The scandal will soon blow over.
4589	1007	Don’t work yourself into a lather just because you don’t think your job interview went well.
4590	1007	I told Mom that we’ll get there on time, but she’s worked herself into a lather about us leaving behind schedule.
4591	1007	Don’t work yourself up into a lather. We don’t need to finish this today. I worked myself into a sweat getting this stuff ready.
4592	1007	Now, now, don’t work yourself up into a lather. He had worked himself into such a sweat, I was afraid he would have a stroke.
4593	1008	Your daughter loves to ham it up for the camera—you might have a little actress on your hands!
4594	1008	This is a serious play, so please don’t ham it up out there.
4595	1008	My toddlers always seem to ham it up whenever we have company over.
4596	1008	This is a serious play, so please don’t ham up your part.
4597	1008	My toddlers like to ham it up whenever we have company.
4598	1008	With the way your daughter hams it up, you might have a future actress on your hands.
4599	1008	When we realized we were being filmed, we all started behaving differently, hamming it up for the cameras.
4600	1009	A: "Do you mind if I order another glass of wine?" B: "Not at all—be my guest."
4601	1009	You want to put on the game? Sure, be my guest. The remote’s on the coffee table.
4602	1009	A: "Hey, can I run in and use your bathroom real quick?" B: "Yeah, be my guest."
4603	1009	Mary: I would just love to have some more cake, but there is only one piece left. Sally: Be my guest. Mary: Wow! Thanks!
4604	1009	Jane: Here’s the door. Who should go in first? Bill: Be my guest. I’ll wait out here. Jane: You’re so polite!
4605	1009	"Do you mind if I use the phone?" — "Be my guest."
4606	1009	If you want to tell her the bad news, Maria, be my guest.
4607	1009	I’ll hurt myself, Mannie screams. Be my guest, says Rebecca.
4608	1009	"May I look at this book?" "Be my guest."
4609	1010	The final score was 17-1? Wow, we really blew that team out of the water!
4610	1010	I planned to be productive today, but a sudden emergency blew that idea out of the water.
4611	1010	As predicted, that candidate won in a landslide—she really blew her opponent out of the water.
4612	1010	The show of support from everyone just blew me out of the water.
4613	1010	That movie really blew me out of the water—I didn’t expect it to be so good!
4614	1010	It’s not like I expected that play to blow me out of the water or anything, but I also didn’t think it would be so dull that I could barely stay awake!
4615	1010	I will blow him out of the water if he shows up around here.
4616	1010	The boss blew the whole idea out of the water.
4617	1010	A DVD music system plays discs that look like CDs, but blows them out of the water.
4618	1010	This is too much. I’m gonna blow that guy out of the water.
4619	1011	The gravity of what happened in this field 200 years ago didn’t sink in until we saw actors recreating the war as it would have been fought.
4620	1011	No matter how many times I go over it, this equation just isn’t sinking in.
4621	1011	By the time the product was finally released onto the market, there was simply no way for the company to earn back what they had sunk in.
4622	1011	When we created this program, we sank a lot of hours in to get it off the ground. If it doesn’t work, I’m going to be very disappointed.
4623	1011	The brave hero sank the wooden stake into the vampire. The hero sank in the stake.
4624	1011	You would not believe how much money I’ve sunk into that company! She sank in a lot of money, but it was all wasted.
4625	1011	I heard what you said, but it took a while for it to sink in. I pay careful attention to everything I hear in calculus class, but it usually doesn’t sink in.
4626	1011	The meaning of the poem finally sank in after I had thought about it for a while.
4627	1012	The business plan looked promising, but it all went pear-shaped when the funding fell through.
4628	1012	Everything was fine during the event until the sound system malfunctioned and things went pear-shaped.
4629	1012	Their vacation plans went pear-shaped after they missed their flight.
4630	1012	The project started well but went pear-shaped due to miscommunication among the team members.
4631	1012	His attempt to fix the car went pear-shaped when he realized he didn’t have the right tools.
4632	1012	She had high hopes for the presentation, but it started to go pear-shaped when the projector failed.
4633	1012	Their investment strategy had initially seemed foolproof, but it had gone pear-shaped due to market fluctuations.
4634	1013	The CEO fell on his sword when widespread corruption in the company was exposed.
4635	1013	Doesn’t this recalled product have your name on it? Well, then, guess what—you’re the one who has to fall on her sword.
4636	1013	I refuse to fall on my sword for something I did not do!
4637	1014	I won’t forget this insult. You’d better start sleeping with one eye open, because I’ll get my revenge.
4638	1015	I’m sad to say it, but after a long vacation, it’s time to get back in the saddle and return to work.
4639	1015	The soccer player recovered from his broken leg and is now back in the saddle, playing his first game since the incident.
4640	1015	After any setback, it’s always important to dust yourself off and get back in the saddle, or you’ll always regret it.
4641	1015	Yes, our business faced some challenges recently, but with a new plan in place, we’re excited to get back in the saddle and turn things around.
4642	1015	I took a break from the hectic publishing world to work on my mental health, but now I’m ready to get back in the saddle and write books!
4643	1015	My son was discouraged and gave up on his YouTube channel after bullies made fun of him, but now he’s ready to get back in the saddle and make more fun videos!
4644	1016	The crowd is getting really fired up right now, so let’s send out the starters for the game.
4645	1016	Don’t go and talk to the boss while you’re all fired up like this—wait until you’re calmer so you don’t say something you’ll regret.
4646	1016	I always get all fired up whenever I hear this song—it makes me feel like I could take on the world!
4647	1016	I know our players are nervous about the big game, but it’s our job as coaches to fire them up.
4648	1016	If a playoff game can’t fire you up, man, you’re playing the wrong sport!
4649	1016	Woo! Up-tempo songs like this always fire me up for a run!
4650	1016	Well, fire up the coffee pot and tell me all about your date last night!
4651	1016	A: "Can you even fire up Pop’s old truck anymore?" B: "I have no idea, but I’m gonna try!"
4652	1016	You fire up the TV, I’ll make the popcorn!
4653	1016	Come on, fire up those cigars, boys—we’re celebrating!
4654	1016	I felt really sick, so that was the first—and last—time I ever fired up a cigarette.
4655	1016	Don’t fire up that joint here! What if my mom sees?
4656	1016	He must fire up all day long because he’s always stoned when I see him.
4657	1016	You guys fired up, didn’t you? Well, the glassy eyes and goofy demeanor made it pretty obvious.
4658	1016	How can you be so fired up at this time of the morning?
4659	1016	It’s impossible to get Martin fired up at all.
4660	1017	You add two cups of water to the mix, heat it for five minutes and Bob’s your uncle, the soup is ready.
4661	1017	Just give it a good mix and apply it on the affected areas, and Bob’s your uncle, the pimple will vanish in 10 minutes.
4662	1017	Use two table spoons of the stain wash to soak your shirt, soak for 20 minutes and Bob’s your uncle, the stain will clear out immediately.
4663	1018	The way she smiles all the time really rubs me the wrong way. It seems so fake.
4664	1018	He’s always talking about how those commercials rub him the wrong way, but I think they’re cute.
4665	1019	Quit yanking my chain, I know there isn’t a Hollywood director calling me right now.
4666	1019	I love yanking my sister’s chain—it’s almost too easy to fool her.
4667	1020	There has been something in the wind among a lot of people lately that a major shakeup is about to take place among the company’s leadership.
4668	1020	There seems to be something in the wind among a lot of people lately that a major shakeup is about to take place among the company’s leadership.
4669	1020	There’s something in the wind at the US Capitol, with many analysts predicting a breakthrough piece of legislation at any moment.
4670	1022	We’re down by two points, and you’re having trouble remembering the plays I’m calling? You need to get your head in the game, Jenkins!
4671	1022	I was so distracted by seeing my ex-girlfriend in the bleachers that I just couldn’t get my head in the game.
4672	1022	If you’re a professional athlete, you need to be able to get your head in the game no matter what is going on in your personal life.
4673	1022	I know you’ve got some issues at home right now, but you’ve got to get your head in the game. If we don’t close this deal today, the whole company goes under!
4674	1022	Did you see all the evidence the defense attorneys produced? If you don’t get your head in the game, we’re going to lose this case!
4675	1022	Even as an intern, I knew I needed to get my head in the game and impress the head of the department.
4676	1023	The mother is glad to know that her son is always on the ball to learn new things in class.
4677	1023	I’ve been working for the last three days in a row, and now I am dog tired, so not really on the ball today.
4678	1023	He was right on the ball regarding his assessment of the situation.
4679	1023	I couldn’t sleep well last night, so am not on the ball today.
4680	1023	When his opponent tried to sneak in a pass, the defender was right on the ball and stopped it well.
4681	1023	This mess wouldn’t have happened had you been on the ball.
4682	1023	“Are you alright? You don’t seem on the ball today.”
4683	1023	This article about the current problems of the nation is right on the ball.
4684	1023	He has been sick all week and wasn’t on the ball when I met him.
4685	1023	He has done a great job. He was really on the ball.
4686	1024	She finds herself with her back to the wall now that creditors are coming after her for more money than she makes.
4687	1024	Sometimes, the best solutions arise when we are with our backs to the wall, when we don’t have the luxury of examining every option under the sun.
4688	1024	Well, they’ve got their backs to the wall now. Today’s loss means that they must win tomorrow to keep their playoff hopes alive.
4689	1025	Scott has been backed into a corner with this mortgage payment that he cannot afford.
4690	1025	When I was backed into a corner during the debate, I panicked and retracted several things I’d already said on the campaign trail.
4691	1025	A lot of companies are being backed into a corner by these increasingly restrictive regulations.
4692	1027	What is causing this water leak? Has anyone gotten to the bottom of it yet?
4693	1027	I have every confidence that our detectives will get to the bottom of this crime.
4694	1027	A: "Do you know why Sophia and Charlie broke up?" B: "Not yet, but I’ll get to the bottom of it, don’t you worry."
4695	1028	The president has made it clear that the environment is low on the totem pole for his administration.
4696	1028	I know I’ll be low man on the totem pole with this internship, but it will at least give me a place to start in my career!
4697	1029	She keeps buckling up and clutching her stomach, so the pain must be pretty bad—let’s take her to the doctor.
4698	1029	I buckled up laughing when Jeff told that Joke at the meeting.
4699	1029	Dad threw out his back again—that’s why he’s buckled up like that.
4700	1029	The boss is in a terrible mood today, so buckle up!
4701	1029	Buckle up, folks. This game is going down to the wire!
4702	1029	Sue is really competitive, so if you’re on her team in gym class today, buckle up.
4703	1029	Buckle the children up before we leave.
4704	1029	Buckle up your shoes.
4705	1029	Please buckle up so our flight can begin.
4706	1029	I wish you would obey the law and belt up.
4707	1029	Buckle up your shoes. We buckled the baby up in its car seat.
4708	1029	The first thing I did when I got on the plane was to buckle up.
4709	1029	Everyone buckled up with laughter when they heard my jokes.
4710	1030	The spinoff TV show should scratch an itch for fans waiting for a full-fledged sequel to the beloved film.
4711	1030	The game is a spiritual successor to one of my favorite games from the ’90s. It isn’t quite the same, but it does scratch the itch.
4712	1031	Good luck finding that doll between now and Christmas—it’s been flying off the shelves. Stores just can’t keep it in stock.
4713	1031	These trashy gossip magazines are of such low quality, yet they always fly off the shelves. It’s a real racket if you ask me!
4714	1031	We had to order a second shipment of shirts because the first batch flew off the shelves!
4715	1032	Your suitcases better be packed because, once the cab gets here, we’ll be off to the races.
4716	1032	Good news, sir—the architect is already off to the races on that project you approved this morning.
4717	1032	The tour bus is out in front waiting and we’ve said goodbye to everyone. Looks like we’re off to the races.
4718	1033	It really grinds my gears when cyclists go zipping through red lights!
4719	1033	John’s not a bad guy, but he has a habit of grinding people’s gears with his political rants.
4720	1033	It totally grinds my gears when people chew their really loudly. Ugh, so annoying!
4721	1034	Are those guns locked and loaded? Because the enemy’s a-comin’.
4722	1034	A: "Please tell me you have all those pamphlets ready for the presentation tomorrow." B: "Yep—locked and loaded!"
4723	1035	The coursework is cut and dried, so don’t even think about coming to me in pursuit of extra credit.
4724	1035	There are no cut-and-dried solutions here. We need to come up with something.
4725	1035	The agenda for these monthly meetings is cut and dried, so you can’t just waltz in there and air your grievances.
4726	1035	I find your writing quite boring. It’s too cut and dried.
4727	1035	The lecture was, as usual, cut and dried.
4728	1035	Now, this situation is not as cut and dried as it may seem.
4729	1035	The link between stress and heart attacks is by no means cut and dried, although most people feel intuitively that it exists.
4730	1035	There are no cut-and-dried answers to the problem.
4731	1035	What appeared to be a cut-and-dried issue, may in fact be a little more complex.
4732	1035	By the end of the evening their plans for carrying out the robbery were cut and dried, with nothing left to chance.
4733	1035	The police thought they had a cut-and-dried case.
4734	1036	With other issues like drug addiction and unemployment taking priority for the government, the welfare of children in the foster system very often slips through the cracks.
4735	1036	We were all so busy drawing up the contracts for this new deal that the appreciation dinner we’d promised to our interns simply slipped through the cracks.
4736	1038	I’d like to get these reports done before the weekend, but I’m not going to knock myself out.
4737	1038	If you want to go through all the files one by one, knock yourself out, but I ain’t doing that.
4738	1038	We don’t get overtime, so there’s no reason to stay, but if Joan wants to she can knock herself out.
4739	1038	I tried to knock out the broken piece, but it seems like it’s stuck in there.
4740	1038	When Dave crashed his bike, he knocked the mail out of the mailbox. It was actually kind of funny.
4741	1038	You really think you can knock out the champ?
4742	1038	We’re going to knock you out for this procedure, so you won’t feel any pain at all.
4743	1038	It’s amazing how standing all day can really knock you out.
4744	1038	My medication usually knocks me out, so I better stay home for the day.
4745	1038	The show of support from everyone just knocked me out.
4746	1038	That movie really knocked me out—I didn’t expect it to be so good!
4747	1038	The storm knocked out power to the whole island.
4748	1038	Be careful not to overload the system—you could knock it out with too much traffic.
4749	1038	Every year, some underdog knocks out a top-seeded team.
4750	1038	I’d love to knock the defending champs out of the tourney, but it will take a miracle.
4751	1038	If we can knock out a few more of these reports before the weekend, we’ll be in good shape for next week.
4752	1038	I’m just trying to knock out as many pages as possible so I can get up to the page count before the deadline.
4753	1039	He took the heavyweight champ’s deadly left hook on the chin, and he was knocked out cold then and there.
4754	1039	He just took the criticism on the chin and kept working on his art.
4755	1039	I know you’re feeling down about the loss, but just take it on the chin and practice harder tomorrow.
4756	1039	Our boss messes around with the company’s money, but we’re the ones who have to take it on the chin when things go wrong.
4757	1039	Dave has been fired before, but this was his dream job, so he really took this one on the chin.
4758	1039	They laid some blunt criticism on him, but he took it on the chin. I knew he could take it on the nose.
4759	1039	Why do I have to take it on the chin for something I didn’t do? If you did it, you have to learn to take it on the chin.
4760	1039	When the police arrived, he took it on the chin, apologizing for the trouble he’d caused them.
4761	1039	We’ve taken a big loss. We’ve taken it on the chin. But we’re out there and we’re going to stay in business.
4762	1039	Andrew is intelligent and wants to learn. He is also prepared to take criticism on the chin, which is a good thing.
4763	1039	They laid some rude chops on him, but he took it on the chin.
4764	1039	Why do I have to take it on the nose for something I didn’t do?
4765	1040	If you don’t turn in your project, you’re digging your own grave. There’s no way you’ll get a decent grade without it!
4766	1040	I’m afraid I’m digging my own grave by turning down the promotion.
4767	1040	A: "Man, you dug your own grave when you insulted the CEO’s wife at the Christmas party." B: "I didn’t know that’s who she was, OK?"
4768	1040	I don’t feel sorry for him — he’s dug his own grave as far as I’m concerned.
4769	1040	I thought about Patricia again and how much I was missing her and how I’d dug my own grave over the phone.
4770	1040	If you give up your job now, you’ll be digging your own grave, because you won’t find it easy to get another one.
4771	1041	You want to win the championship, right? Well, then you’ve got to go out there and put it all on the line!
4772	1041	This product is our last chance to make it in this industry, so we’re putting it all on the line to make sure it sells.
4773	1042	I was already thinking about buying the new car, but having a test drive in one pushed me over the top.
4774	1042	Mrs. Patterson’s generous donation has put us over the top to reach our $1 million goal!
4775	1042	The blood and gore is as over the top as any fan of slasher films might hope.
4776	1042	The lead actor’s over-the-top performance ruined the play for me.
4777	1042	If you send your men over the top right now, it will be suicide.
4778	1042	The cable bill had gotten so expensive that I just decided to go over the top instead.
4779	1042	Our fund-raising campaign went over the top by $3,000. We didn’t go over the top. We didn’t even get half of what we set out to collect.
4780	1042	The comedy sketch was so over-the-top that most of the audience was embarrassed.
4781	1042	At one point, which I think is a bit over the top, he talks about the collapse of civilization.
4782	1042	Perhaps I was a bit over the top, accusing you of being a traitor.
4783	1042	Maybe he went a bit over the top with some of his language.
4784	1042	I hate the way models wear all that over-the-top make-up.
4785	1042	Competitive schools receive applications from dozens of A-grade students. An extra skill may push a candidate over the top.
4786	1043	I was just calling to touch base since it’s been a few weeks since we last spoke.
4787	1043	Will you please touch base with the marketing team and find out how they’re progressing?
4788	1043	I need to touch base with John on this matter.
4789	1043	John and I touched base on this question yesterday, and we are in agreement.
4790	1043	Being there gave me a chance to touch base with some old friends that I hadn’t seen for a year.
4791	1043	A brief phone-call is often made during the month to touch base and update the parent on any changes in the basic treatment plan.
4792	1043	She travels to Boston every week to touch base with her office.
4793	1043	I spent an hour or two sending emails and touching base with my friends.
4794	1044	Our neighbor is in the hospital because a burglar beat him to within an inch of his life.
4795	1044	The sudden blaring of the alarm scared me within an inch of my life.
4796	1044	The accident frightened me within an inch of my life. When Mary was seriously ill in the hospital, she came within an inch of her life.
4797	1045	You should pick John’s brain sometime. He knows all about car engines.
4798	1045	I’ve just started playing professionally, and I’d love to pick your brains for any tips you might have.
4799	1045	I spent the afternoon with Donna, picking her brain for ideas to use in our celebration. Do you mind if I pick your brains? I need some fresh ideas.
4800	1045	I’d like to pick your brains about something. Nothing urgent.
4801	1045	She, in turn, picked my brains about London as she was thinking about a trip to England.
4802	1045	He has helped me enormously over the last few years. We used to travel down to training together and I was always picking his brain for information.
4803	1045	I need some help with this project. Can I pick your brains?
4804	1046	It was a real slap in the face when she got promoted over me, especially after the amount of work I did on that last project.
4805	1046	Losing the election was a slap in the face for the club president. Failing to get into a good college was a slap in the face to Tim after his years of study.
4806	1046	The union leader described the payouts to both bosses as `a slap in the face for all the hard-working staff who now find themselves out of work’.
4807	1046	They promoted a colleague who had been with the company for less time than Paola and it was a real slap in the face for her.
4808	1046	The move was seen as another slap in the face for the monarchy in Australia.
4809	1046	The bank refused to lend her any more money, which was a real slap in the face for her.
4810	1046	That remark was a real slap in the face.
4811	1047	Bill hasn’t been late to school that many times, so just give him a slap on the wrist for his tardiness.
4812	1047	Most people are outraged that the corporation only received a slap on the wrist after violating so many regulations.
4813	1047	She was given a small fine — a slap on the wrist really.
4814	1047	But other than a few slaps on the wrist, the General went unpunished.
4815	1047	I got a slap on the wrist from my secretary today for leaving the office so untidy.
4816	1048	Everyone went into a panic when we started taking a nosedive, but the skilled pilot managed to regain control of the plane and landed it safely.
4817	1048	I was so distracted by the girl I like in class that I tripped and took a nosedive right in front of her.
4818	1048	My father has held out bravely in his fight against cancer, but I’m afraid he’s taken a nosedive in the last couple of weeks.
4819	1048	Shares in the company are taking a nosedive ever since news of the tax scandal went public.
4820	1048	The market took a nosedive again today.
4821	1049	When you name your food truck, make sure it’s something that rolls off the tongue so that people will remember it.
4822	1049	The book is a joy to read aloud. The passages just roll off the tongue.
4823	1049	A: "The game’s Japanese title translates as "Heavenly Violence of the Demon Castle—Strike at the Heart of Your Fear."" B: "Wow, it just rolls right off the tongue."
4824	1049	It’s not a name that exactly trips off the tongue, is it?
4825	1050	Don’t worry about those thugs, buddy. I’ve got your back if they ever come bother you again.
4826	1050	You can always rely on your parents to have your back.
4827	1051	Where did you pick that up? I picked up this tool at the hardware store.
4828	1051	I pick languages up easily. I picked up a lot of knowledge about music from my brother.
4829	1051	All right, let’s pick up the tempo and get it moving faster. Okay, get moving. Pick it up!
4830	1051	Pick it up right where you stopped. I’ll have to pick up my work where I left off.
4831	1051	I can just pick it up with a powerful telescope. I can hardly pick up a signal.
4832	1051	The dogs finally picked the scent up. You should pick up highway 80 in a few miles.
4833	1051	My parents were afraid that I would pick up bad habits at summer camp. She never studied French in school—she just picked it up when she was working in Paris.
4834	1052	It’s no wonder you’re the teacher’s favorite from the way you lick her boots!
4835	1052	Look, it’s just the nature of this business that sometimes you have to lick your superiors’ boots if you want to get ahead.
4836	1053	It’s no wonder you’re the teacher’s favorite from the way you kiss her ass!
4837	1053	Look, it’s just the nature of this business that sometimes you have to kiss ass if you want to get ahead.
4838	1054	We have a team of helpers on deck to make sure everyone here has a fantastic experience.
4839	1054	Who do we have on deck to deal with the power outage?
4840	1054	With their record-breaking batter on deck, the team is hoping to take the lead.
4841	1054	Everyone except the cook was on deck when the storm hit.
4842	1054	Ann, get on deck. You’re next.
4843	1054	Who’s on deck now?
4844	1055	The situation definitely got out of hand after a few fans started throwing snowballs.
4845	1055	The real estate market in this city is totally out of hand!
4846	1055	She’s so stubborn that she just rejected my suggestion out of hand.
4847	1055	We’d like to try some alternative treatments. They’re a bit unconventional, but please don’t dismiss them out of hand.
4848	1055	He has rejected out of hand any suggestion that there can be any compromise over the proposals.
4849	1055	He said he hadn’t rejected the idea out of hand.
4850	1055	They rejected my suggestion out of hand.
4851	1055	Employee absenteeism has gotten out of hand.
4852	1055	dismissed my complaint out of hand.
4853	1056	Well, we have a long day ahead, so let’s roll up our sleeves and start!
4854	1056	I know you’re disappointed, but you need to roll up your sleeves and redouble your efforts.
4855	1056	He was very much a team player, rolling up his sleeves and getting down to work.
4856	1056	When others refused to act, Jamie was the first to roll up his sleeves and get to work.
4857	1056	We’ve just moved into a bigger house and there’s a lot to do. I guess we’ll just have to roll up our sleeves and get on with it.
4858	1058	I think the senator will be licking his wounds for a while after that disastrous debate performance.
4859	1058	After the terrible meeting and all the criticism, I went back to my office to lick my wounds.
4860	1058	England’s cricketers are licking their wounds after being soundly defeated in the second Test against Australia at Melbourne.
4861	1058	"He heard this morning that he hasn’t got the job." "Where is he?" "Licking his wounds somewhere, probably."
4862	1059	I don’t have any cooking oil. Is there anything else I can add to the recipe in a pinch?
4863	1059	Ah, this shade of lipstick will do in a pinch—it’s better than nothing.
4864	1059	Mary cannot keep track of the many times Dave got himself into a jam.
4865	1059	I found myself in a jam when my car overheated on the highway.
4866	1059	A piece of clothing can be used as a bandage in a pinch.
4867	1059	In a pinch, you can use folded paper to prop up the table leg so the table won’t rock.
4868	1059	I think I’m sort of in a jam.
4869	1060	My kids always try to put me on the spot with requests, knowing that I’m less likely to turn them down in front of their friends’ parents.
4870	1060	When the boss put me on the spot in the meeting today, I wasn’t prepared to answer his question and ended up babbling like a fool.
4871	1061	I can’t believe she still doesn’t listen to other people. I guess it’s true that as the twig is bent, so is the tree inclined.
4872	1061	I always knew Johnny was a slacker who would never go far in life. As the twig is bent, so is the tree inclined.
4873	1061	I know that as the twig is bent, so is the tree inclined—that’s why I try to instill good habits in my sixth grade students.
4874	1062	I don’t need a high-end TV, but I don’t want the cheapest one either. I’m looking for a middle-of-the-road option.
4875	1062	Most of the voters found the candidate’s middle-of-the-road platform to be reasonable and palatable.
4876	1063	I can’t believe Ms. Jones gave me a demerit for being a minute late! Ugh, she has such a stick up her ass!
4877	1063	Tim’s no fun, he always has a stick up his ass—why did you invite him to your party?
4878	1064	Becky and I were supposed get brunch this weekend, but things are up in the air now because she’s not feeling well.
4879	1064	The whole town is protesting the plans to build a new shopping center, so the proposal is up in the air now.
4880	1064	Now that the caterer has backed out at the last minute, the event is really up in the air.
4881	1064	Because the whole town protested plans to build a new shopping center, that proposal is now up in the air.
4882	1064	I don’t know what Sally plans to do. Things were sort of up in the air the last time we talked.
4883	1064	Let’s leave this question up in the air until next week.
4884	1064	At the moment, the fate of the Hungarian people is still up in the air.
4885	1064	This project is very much up in the air.
4886	1064	Prospects for federal research and development are up in the air as Republicans looking for budget cuts take control on Capitol Hill.
4887	1066	To be perfectly honest, I feel like voting is just pissing in the wind, so I just don’t bother.
4888	1066	My mom and dad spent years pissing in the wind trying to get my brother to take his studies seriously, and in the end he dropped out anyway to pursue a career in music.
4889	1067	Since you know the recruiter, do you think you can go to bat for me? I really need this job.
4890	1067	Thankfully, my manager went to bat for me when the company was looking to lay off employees.
4891	1067	Of course I’ll go to bat for you with the headmaster—I know you had nothing to do with this prank.
4892	1067	I tried to go to bat for Bill, but he said he didn’t want any help.
4893	1067	I heard them gossiping about Sally, so I went to bat for her.
4894	1067	She was just fabulous in going to bat for me, in not being judgmental, and helping me work it out.
4895	1067	I wasn’t ashamed to go in to bat for Matt. I had faith his acting talent would justify it.
4896	1067	Nursing students are going to go to bat for the homeless.
4897	1068	What ridiculous scheme has Sam cooked up now?
4898	1068	I knew Rich was cooking up something nefarious, I just didn’t realize it involved stealing money from his clients!
4899	1068	What are you boys whispering about back there? You better not be cooking up any mischief!
4900	1068	Have you been able to cook anything up with the boss yet? We really need to meet about this issue soon.
4901	1068	Good luck cooking something up with Patty—her schedule is always chock-full.
4902	1068	I would love to talk about this more, so cook something up with my assistant and get on my calendar.
4903	1068	The dog ate your homework, huh? Now there’s cooked-up excuse!
4904	1068	It turns out that the statistics were actually cooked up—they had no basis in reality.
4905	1068	If you don’t want to come with me, just say so—don’t give me some cooked-up story.
4906	1068	What a cooked-up story! Of course, you don’t believe it.
4907	1068	Don’t cook up an excuse just because you’re late. The suspect cooked up an alibi at the last minute.
4908	1069	Stop standing around with your thumb up your ass and help me push this car off the road!
4909	1069	A: "Tom’s still just standing around with his thumb up his ass." B: "Call him in here—I’ll give him something nice and boring to do."
4910	1070	Look at her, hobnobbing with the rich upper crust and refusing to come talk to us. Just when did she start thinking her shit don’t stink?
4911	1071	I can’t believe he left the company and then cherry-picked the best employee in my department!
4912	1071	Yes, you will get to cherry-pick all the equipment that goes into your studio.
4913	1071	Good luck getting through to him with actual facts—he just cherry-picks information that omits or ignores anything that goes against his own beliefs.
4914	1072	Let’s get going—the kids are hot to trot.
4915	1072	If you think he’s so hot to trot, why don’t you ask him out?
4916	1072	I’m telling you, dude, when she smells your cologne, she’ll be hot to trot!
4917	1072	Donatella was my Italian dream — hot to trot.
4918	1072	Ottawa Mayor Bob Chiarelli is hot to trot for more and better urban transport.
4919	1073	Losing his job was a wake-up call for Tom to reassess his career goals and pursue his passion.
4920	1073	The team’s poor performance in the previous game served as a wake-up call for the players to train harder.
4921	1073	Receiving a low grade on the exam was a wake-up call for Sarah to prioritize her studies and improve her academic performance.
4922	1074	Oh, I cut my teeth on those kinds of equations! Give me a challenging problem for a change!
4923	1074	Jen may be young, but she cut her teeth on academic writing, so her perspective and expertise will be invaluable to us.
4924	1074	How did you cut your teeth on work like this? It’s just such a hard industry to break into.
4925	1074	It was a small experimental theatre company and many of today’s most successful actors cut their teeth there.
4926	1076	You really left us twisting in the wind when you decided to take your vacation right before the project’s deadline!
4927	1076	The government’s sudden decision not to continue funding the program has left many residents twisting slowly in the wind.
4928	1076	I’ll see you twist in the wind for trying to frustrate this investigation. The prosecutor was determined that Richard would twist slowly in the wind for the crime.
4929	1076	The court case that had been planned to start in April 2004 was abandoned, leaving the parents concerned twisting in the wind.
4930	1076	Critics accused the Prime Minister of leaving the minister swinging in the wind and insist that he should back him or sack him.
4931	1076	"I didn’t want to leave them hanging in the wind", Johnson said of his team-mates.
4932	1076	When the scandal broke, his business partners left him to twist in the wind.
4933	1076	I’ll see you twist in the wind for trying to frustrate this investigation.
4934	1079	Don’t invite Joe to lunch unless you want to hear him brag about all the important things he’s doing in his new job. He’s just the cock of the walk lately.
4935	1079	He struts around campus like he’s the cock of the walk, all because his dad is some politician.
4936	1079	You’re not going to make many friends at your new school if you go around like the cock of the walk.
4937	1079	The deputy manager was cock of the walk until the new manager arrived.
4938	1079	He loved acting cock of the walk and ordering everyone about.
4939	1079	Back then I had fame and fortune and I thought I was cock of the walk.
4940	1080	Calhoun: "Sheriff, those bandits could come back to town any day now. We’re all terrified that they’re going to rob us again!" Sheriff: "Not on my watch, Calhoun. I’ll have those bandits locked up for life if they ever show their faces around here again!"
\.


--
-- TOC entry 3598 (class 0 OID 147521)
-- Dependencies: 214
-- Data for Name: idioms_origin_test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.idioms_origin_test (origin_id, idiom_id, example) FROM stdin;
\.


--
-- TOC entry 3594 (class 0 OID 147476)
-- Dependencies: 210
-- Data for Name: idioms_test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.idioms_test (id, title, title_general, definition, contributor, timestamps) FROM stdin;
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
320	Waking up on the wrong side of the bed	Wake up on the wrong side of (the) bed	To be in a particularly and persistently irritable, unhappy, or grouchy mood or state, especially when it is not in line with one’s normal disposition.	\N	2023-07-16 00:00:20-07
668	Fair weather friend	Fair-weather friend	Someone who remains a friend only when things are going well but abandons others during times of trouble or difficulty.	\N	2023-08-08 00:00:10-07
75	Everything but the kitchen sink	Everything but the kitchen sink	Nearly everything one can reasonably imagine; many different things, often to the point of excess or redundancy.	\N	2023-07-13 00:01:15-07
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
764	End of the line	The end of the line	The physical end of a route of travel, usually a bus or train route.	Christina	2023-08-19 00:00:05-07
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
174	Fall off the wagon	Fall off the wagon	To return to drinking alcohol after a period of abstinence. Usually said of recovering alcoholics.	\N	2023-07-14 00:47:00-07
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
152	Spill the beans	Spill the beans	To reveal something that was meant to be a secret.	Eve	2023-07-14 00:25:00-07
153	At loose ends	At loose ends	Uneasy, typically due to some problem or unresolved issue.	Eve	2023-07-14 00:26:00-07
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
321	Wrong side of the tracks	The wrong side of the tracks	A part of a town or city that is particularly impoverished (and usually dangerous or undesirable as a result).	\N	2023-07-16 00:00:21-07
116	If it walks like a duck, talks like duck, it’s probably a duck	if it looks like a duck and walks like a duck, it is a duck	If something has all the characteristics of a thing, it is probably that thing, regardless of what it is called or presented as. There are many variations of the expression, and it is often shortened to the first part of the phrase.	\N	2023-07-13 00:01:56-07
117	Waiting for the other shoe to drop	Waiting for the other shoe to drop	To wait for the next, seemingly unavoidable (and typically negative) thing to happen.	Eve	2023-07-13 00:01:57-07
121	Early bird gets the worm	The early bird catches the worm	Someone who seizes some opportunity at the earliest point in time will have the best chance of reaping its benefits.	\N	2023-07-13 00:02:01-07
122	Let sleeping dogs lie	Let sleeping dogs lie	To leave a situation alone so as to avoid worsening it.	Eve	2023-07-13 00:02:02-07
123	A stitch in time saves nine	A stitch in time (saves nine)	A prompt, decisive action taken now will prevent problems later.	Eve	2023-07-13 00:02:03-07
124	Every dog has his day	Every dog has his/her/their day	Even the least fortunate person will have success at some point.	Eve	2023-07-13 00:02:04-07
125	Reap what you sow	Reap what (one) sows	To suffer the negative consequences of one’s actions.	\N	2023-07-13 00:02:05-07
126	Till the cows come home	Until the cows come home	For a very long, indefinite amount of time; forever.	Eve	2023-07-13 00:02:06-07
127	Chickens come home to roost	(one’s) chickens come home to roost	For a very long, indefinite amount of time; forever.	Eve	2023-07-13 00:02:07-07
133	Baked in the cake	Baked in the cake	\N	Miles	2023-07-14 00:00:06-07
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
151	Look what the cat dragged in	Look what the cat(’s) dragged in	A mild and usually playful insult used to announce someone’s arrival and suggest that the person has a messy or otherwise disheveled physical appearance.	Eve	2023-07-14 00:24:00-07
154	Canary in a coal mine	Canary in a/the coal mine	Something or someone who, due to sensitivity to his, her, or its surroundings, acts as an indicator and early warning of possible adverse conditions or danger. Refers to the former practice of taking caged canaries into coal mines. The birds would die if methane gas became present and thereby alert miners to the danger.	Eve	2023-07-14 00:27:00-07
156	All hands on deck	All hands on deck	\N	Miles	2023-07-14 00:29:00-07
157	Crying wolf	Cry wolf	To claim that something is happening when it really isn’t, which results in the rejection of subsequent valid claims. The expression comes from one of Aesop’s fables, in which a young shepherd lies about a wolf threatening his flock so many times that people do not believe him when he and his flock are legitimately in danger.	Eve	2023-07-14 00:30:00-07
158	Cross your t’s dot your i’s	\N	\N	\N	2023-07-14 00:31:00-07
159	Over the moon	Over the moon	Extremely happy.	Eve	2023-07-14 00:32:00-07
160	Shoot for the stars	Shoot for the stars	To set one’s goals or ambitions very high; to try to attain or achieve something particularly difficult.	Eve	2023-07-14 00:33:00-07
161	Read between the lines	Read between the lines	To infer or understand the real or hidden meaning behind the superficial appearance of something. "Lines" refers to lines of text on a printed page.	Eve	2023-07-14 00:34:00-07
162	Put that in you’re pipe and smoke it	\N	\N	Miles	2023-07-14 00:35:00-07
163	Rode hard and put away wet	Ride hard and put (something) away wet	\N	Miles	2023-07-14 00:36:00-07
164	Put the axe to the grindstone	\N	\N	Miles	2023-07-14 00:37:00-07
165	A penny saved is a penny earned	A penny saved is a penny earned	Every small amount helps to build one’s savings (i.e. by saving a penny, you have one more penny).	Miles	2023-07-14 00:38:00-07
166	Key to my heart	The key to (one’s) heart	That which will make one very happy or content; the way to make one appreciate, like, or love someone else.	Eve	2023-07-14 00:39:00-07
168	You can’t have your cake and eat it too	You can’t have your cake and eat it(, too)	You cannot have or do two things that are both desirable but normally contradictory or impossible to have or do simultaneously.	\N	2023-07-14 00:41:00-07
169	Kill two birds with one stone	Kill two birds with one stone	To complete, achieve, or take care of two tasks at the same time or with a singular series of actions; to solve two problems with one action or solution.	Eve	2023-07-14 00:42:00-07
170	I don’t have a horse in that race	\N	\N	Eve	2023-07-14 00:43:00-07
171	That’s the way the cookie crumbles	That’s the way the cookie crumbles	There is nothing we can do about the way things have unfolded, especially bad ones, so there is no reason to be upset about it.	Miles	2023-07-14 00:44:00-07
172	A straight arrow	Straight arrow	An honest, ethical person who makes good decisions.	\N	2023-07-14 00:45:00-07
173	On the straight and narrow	On the straight and narrow	Maintaining a morally upright way of life; only making choices that are considered morally and legally correct.	Eve	2023-07-14 00:46:00-07
175	Knocking on death’s door	\N	\N	\N	2023-07-14 00:48:00-07
176	Pushing daisies	\N	\N	\N	2023-07-14 00:49:00-07
177	Every rose has its thorn	Every rose has its/a thorn	There is rarely a good or positive thing, event, or circumstance that is not accompanied by some aspect that is negative or unpleasant.	Miles	2023-07-14 00:50:00-07
178	Lightning never strikes the same place twice	Lightning never strikes (the same place) twice	Something that’s very extraordinary and unlikely to happen will never happen to the same person twice. (Said especially of tragic or unfortunate events..	\N	2023-07-14 00:51:00-07
179	Dog eat dog world	A dog-eat-dog world	A society, situation, industry, etc. characterized by ruthless behavior and competition.	\N	2023-07-14 00:52:00-07
180	It’s a small world after all	\N	\N	\N	2023-07-14 00:53:00-07
181	Smoke em if you got em	\N	\N	\N	2023-07-14 00:54:00-07
182	On the tip of your tongue	On the tip of (one’s) tongue	Almost able to be recalled.	\N	2023-07-14 00:55:00-07
183	Pulled the short straw	\N	\N	\N	2023-07-14 00:56:00-07
184	Dear in headlights	\N	\N	\N	2023-07-14 00:57:00-07
185	Babe in the woods	Babe in the woods	A person who is gullible, naïve, or lacks experience in a specific situation.	\N	2023-07-14 00:58:00-07
186	Cold feet	Cold feet	Nervousness or anxiety felt before one attempts to do something.	\N	2023-07-14 00:59:00-07
187	Caught red handed	Catch (one) red-handed	To see, and perhaps apprehend, someone as they are doing something (often something nefarious). The phrase might have originally referred to blood on a murderer’s hands.	\N	2023-07-14 01:00:00-07
188	Going hard in the paint	\N	\N	\N	2023-07-14 01:01:00-07
189	On the fence	On the fence	Not making a decision or taking a side when presented with two options or possibilities; undecided.	\N	2023-07-14 01:02:00-07
566	Dancing with the devil	\N	\N	\N	2023-07-20 00:00:30-07
190	In the weeds	(deep) in the weeds	Of a restaurant worker, completely overwhelmed with diners’ orders and unable to keep up with the pace.	\N	2023-07-14 01:03:00-07
191	Putting the cart before the horse	Put the cart before the horse	To do things out of the proper order.	\N	2023-07-14 01:04:00-07
192	Paint the town red	Paint the town (red)	To go out into a city or town and have an enjoyable time, typically by visiting various establishments, such as bars, restaurants, clubs, etc.	\N	2023-07-14 01:05:00-07
193	Pipe dream	Pipe dream	A dream or idea that is impossible to accomplish.	\N	2023-07-14 01:06:00-07
195	Don’t blow smoke up my ass	\N	\N	\N	2023-07-14 01:08:00-07
196	Monkey see monkey do	Monkey see, monkey do	Children naturally tend to imitate or copy what they see adults or other children doing.	\N	2023-07-14 01:09:00-07
197	Pull yourself up by your bootstraps	Pull (oneself) up by (one’s) (own) bootstraps	To improve one’s life or circumstances through one’s own efforts, rather than relying on others.	\N	2023-07-14 01:10:00-07
198	Rat race	Rat race	A fierce competition for success, wealth, or power.	\N	2023-07-14 01:11:00-07
199	Written in stone	Written in stone	Permanently fixed or firmly established; incapable of being changed. Often used in the negative.	\N	2023-07-14 01:12:00-07
200	Smooth sailing	Smooth sailing	Progress or advancement that is free from difficulties, obstacles, or challenges.	\N	2023-07-14 01:13:00-07
201	All down hill from here	\N	\N	\N	2023-07-14 01:14:00-07
202	Shooting blanks	Shoot blanks	Of a man, to have a low sperm count in his semen.	\N	2023-07-14 01:15:00-07
203	Pushing rope	\N	\N	\N	2023-07-14 01:16:00-07
204	Blacker the berry sweeter the juice	\N	\N	\N	2023-07-14 01:17:00-07
205	Over my dead body	Over my dead body	I will never allow it; under no circumstances will that be permitted to happen (i.e., something can only happen if I am not alive to prevent it).	\N	2023-07-14 01:18:00-07
206	Raise the roof	Raise the roof	To engage in loud, unrestrained, and boisterous behavior, especially at a party or while celebrating.	\N	2023-07-14 01:19:00-07
207	It takes village to raise a child	\N	\N	\N	2023-07-14 01:20:00-07
208	Get on board	\N	\N	\N	2023-07-14 01:21:00-07
343	Fly on the wall	Fly on the wall	One who is able to observe something closely but invisibly and without interfering in the situation.	\N	2023-07-16 00:00:43-07
209	Below the belt	Below the belt	Unfairly targeted at one’s weakness or vulnerability. The phrase refers to boxing, in which hitting an opponent below the waist is prohibited.	\N	2023-07-14 01:22:00-07
210	0 to 60	Go from zero to sixty	To accelerate from a standstill to sixty miles per hour. Used to indicate how quickly a vehicle, especially an automobile, can accelerate.	\N	2023-07-14 01:23:00-07
211	Turn on a dime	Turn on a dime	To turn very quickly and with great agility.	\N	2023-07-14 01:24:00-07
212	Once bitten twice shy	Once bitten, twice shy	Once one is hurt by someone or something, one will be extra cautious to avoid that person or thing.	\N	2023-07-14 01:25:00-07
213	The road to hell is paved with good intentions	The road to hell is paved with good intentions	Good intentions do not matter if a person’s actions lead to bad outcomes.	\N	2023-07-14 01:26:00-07
214	Don’t shit where you eat	Don’t shit where you eat	Do not engage in troublesome or dubious behavior at one’s home, place of business, or any location where one frequents, for it invites undesired consequences.	\N	2023-07-14 01:27:00-07
215	Don’t dip the pen in company ink	\N	\N	\N	2023-07-14 01:28:00-07
216	Pulling your leg	Pull (one’s) leg	To tease or joke with someone, often by trying to convince them of something untrue.	\N	2023-07-14 01:29:00-07
220	Glass half empty	Glass half empty	Of or characterized by a generally pessimistic worldview. (Typically hyphenated and used as a modifier before a noun..	\N	2023-07-14 01:33:00-07
222	Strike gold	Strike gold	Literally, to discover gold, as in a gold mine.	\N	2023-07-14 01:35:00-07
223	Ruling with an iron fist	Rule with an iron fist	To rule, govern, or control a group or population with complete, typically tyrannical authority over all aspects of life, work, etc.	\N	2023-07-14 01:36:00-07
224	Now we’re cooking with gas	Now (one’s) cooking (with gas)	Now one is making progress or doing something right.	\N	2023-07-14 01:37:00-07
225	Not on the same page	\N	\N	\N	2023-07-14 01:38:00-07
322	Dumpster fire	Dumpster fire	A complete and utter disaster or a completely chaotic situation, likened to a fire in a dumpster, which quickly becomes uncontrollable. The phrase can be applied to both situations and people.	\N	2023-07-16 00:00:22-07
535	Bigger fish to fry	Bigger fish to fry	More important matters to deal with.	Miles	2023-07-19 00:00:55-07
217	Jerking your chain	Jerk (one’s) chain	To tease someone, often by trying to convince them of something untrue.	\N	2023-07-14 01:30:00-07
226	Stop and smell the roses	Stop and smell the roses	To take time to enjoy the finer or more enjoyable aspects of life, especially when one has become overworked or overly stressed.	\N	2023-07-14 01:39:00-07
227	Slippery slope	Slippery slope	A situation in which some behavior or action will eventually lead to a worse form of the same behavior or action, or a disastrous outcome.	\N	2023-07-14 01:40:00-07
228	Pick your battles	Pick (one’s) battle(s)	To choose not to participate in minor, unimportant, or overly difficult arguments, contests, or confrontations, saving one’s strength instead for those that will be of greater importance or where one has a greater chance of success.	\N	2023-07-14 01:41:00-07
229	On my last leg	On (one’s) last legs	Near physical collapse or death.	\N	2023-07-14 01:42:00-07
230	Watch a pot it never boils	\N	\N	Eve	2023-07-14 01:43:00-07
231	The tip of the iceberg	Just the tip of the iceberg	Only a small, often unrepresentative portion of something much larger or more complex that cannot yet be seen or understood.	Miles	2023-07-14 01:44:00-07
232	Needle in a haystack	Needle in a haystack	Something that is very difficult to locate.	Eve	2023-07-14 01:45:00-07
233	Still waters run deep	Still waters run deep	Quiet people have interesting, profound, or complex thoughts.	Eve	2023-07-14 01:46:00-07
234	An elephant never forgets	An elephant never forgets	One remembers everything. A play on the idea that elephants have great memories.	Eve	2023-07-14 01:47:00-07
235	Trojan horse	Trojan horse	Something that initially seems innocuous but is ultimately bad or malicious. A reference to the myth in which Ancient Greek soldiers hid inside a giant wooden horse in order to gain access to the city of Troy.	Eve	2023-07-14 01:48:00-07
236	Like a fish in water	\N	\N	Eve	2023-07-14 01:49:00-07
237	Where there’s smoke there’s fire	Where there’s smoke, there’s fire	When there is some indication of a problem or wrongdoing, such a thing probably occurred or exists.	Eve	2023-07-14 01:50:00-07
238	Shot in the dark	A shot in the dark	A guess or estimate with very little or no assurance as to its accuracy.	Eve	2023-07-14 01:51:00-07
239	If you can’t beat ‘em join em	\N	\N	Eve	2023-07-14 01:52:00-07
240	Low hanging fruit	Low-hanging fruit	That which is especially easy to obtain or achieve. Often implies something that is perhaps not as satisfying as that which takes more effort or skill to obtain or do.	Miles	2023-07-14 01:53:00-07
323	The front lines	\N	\N	\N	2023-07-16 00:00:23-07
324	Don’t cry over spilt milk	\N	\N	\N	2023-07-16 00:00:24-07
325	Meat shield	\N	\N	Miles	2023-07-16 00:00:25-07
327	Throw down the gauntlet	Throw down the gauntlet	To issue a challenge or invitation, as to a fight, argument, or competition.	\N	2023-07-16 00:00:27-07
765	In the thick of it	In the thick of it	Very busy; in the middle of or preoccupied with something or several things.	Christina	2023-08-20 00:00:00-07
339	Stepping on toes	\N	\N	\N	2023-07-16 00:00:39-07
328	Getting your foot in the door	Get a/(one’s) foot in the door	To have a chance to do something that could lead to further opportunities. The phrase is often used to refer to employment.	\N	2023-07-16 00:00:28-07
329	One foot out the door	One foot out the door	A lack of commitment to or eagerness to give up on someone or something.	\N	2023-07-16 00:00:29-07
330	Dip your toe in	Dip (one’s) toe in(to) (something)	To tentatively begin or get involved in a new experience. Likened to gently placing one’s toe into water to test its temperature.	\N	2023-07-16 00:00:30-07
331	Test the waters	Test the water(s)	To informally or casually attempt to gauge the reaction of a potential audience or recipient of something, or to try to get an idea of what something will be like before actually doing it. Likened to feeling the temperature of water before getting in.	\N	2023-07-16 00:00:31-07
332	Play the field	Play the field	To bet on all horses in a race other than the one favored to win.	\N	2023-07-16 00:00:32-07
333	Play ball	Play ball	In baseball, a phrase traditionally said or shouted by the umpire to start the game.	\N	2023-07-16 00:00:33-07
334	Throw it at the wall and see what sticks	\N	\N	\N	2023-07-16 00:00:34-07
335	Watch a pot it never boils	\N	\N	\N	2023-07-16 00:00:35-07
336	That’s all she wrote	That’s all she wrote	This is the end; there is nothing left to say.	\N	2023-07-16 00:00:36-07
337	Head too big to fit in the door	\N	\N	\N	2023-07-16 00:00:37-07
338	Kick the can down the road	Kick the can down the road	Especially in politics, to postpone or defer a definitive action, decision, or solution, usually by effecting a short-term one instead.	Miles	2023-07-16 00:00:38-07
340	Reading the writing in the wall	\N	\N	\N	2023-07-16 00:00:40-07
341	Coming out of the woodwork	Come out of the woodwork	To appear unexpectedly, or from unexpected places.	\N	2023-07-16 00:00:41-07
342	If walls could talk	\N	\N	\N	2023-07-16 00:00:42-07
344	The walls have ears	The walls have ears	Someone might be eavesdropping.	\N	2023-07-16 00:00:44-07
345	Blow this popsicle stand	Blow this popsicle stand	To leave a place, especially one that has become dull or of no use or interest, generally in search of something better.	Miles	2023-07-16 00:00:45-07
346	Till the wheels fall off	The wheels fall off	Things go disastrously wrong; a situation devolves into ruin or chaos.	\N	2023-07-16 00:00:46-07
347	Hot on your tail	\N	\N	\N	2023-07-16 00:00:47-07
348	Bone to pick	A bone to pick	An issue to discuss—typically one that is a source of annoyance for the speaker.	\N	2023-07-16 00:00:48-07
349	Put out to pasture	Put (someone or something) out to pasture	Literally, to retire an animal from working by allowing it roam in a field or pasture.	\N	2023-07-16 00:00:49-07
350	Ball and chain	Ball and chain	Something, usually a responsibility of some kind, that restricts one’s freedom or limits one’s possibilities for personal pursuits.	\N	2023-07-16 00:00:50-07
351	Down in the dumps	Down in the dumps	Sad or depressed.	\N	2023-07-16 00:00:51-07
352	Don’t let the bed bugs bite	Don’t let the bedbugs bite	Sleep soundly and well. Part of the sing-song rhym."good night, sleep tight, don’t let the bedbugs bite,"	\N	2023-07-16 00:00:52-07
353	Smoke and mirrors	Smoke and mirrors	Trickery, deception, or misdirection.	\N	2023-07-16 00:00:53-07
354	Running circles around someone	Run circles around (someone or something)	To move much faster than someone or something.	\N	2023-07-16 00:00:54-07
355	Picking up slack	\N	\N	\N	2023-07-16 00:00:55-07
265	Playing with fire	Play with fire	To do something that risks causing one harm, damage, or misfortune; to do something dangerous.	\N	2023-07-15 00:00:24-07
267	Perfect storm	Perfect storm	A chance or rare combination of individual elements, circumstances, or events that together form a disastrous, catastrophic, or extremely unpleasant problem or difficulty.	Eve	2023-07-15 00:00:26-07
268	Cut corners	Cut corners	To skip certain steps in order to do something as easily or cheaply as possible, usually to the detriment of the finished product or end result.	Miles	2023-07-15 00:00:27-07
269	Tall drink of water	Tall drink of water	A tall, typically slender person.	Eve	2023-07-15 00:00:28-07
270	The road less traveled	The road less traveled	The less popular or common option. The phrase is typically associated with Robert Frost’s 1916 poem "The Road Not Taken."	Miles	2023-07-15 00:00:29-07
271	A square peg in a round hole	A square peg in a round hole	A person who does not fit in or is not comfortable with others or in a particular situation; someone who is unsuited to a certain task, position, situation, or group of people.	Miles	2023-07-15 00:00:30-07
272	Bouncing off the walls	Be bouncing off the walls	To be very active and energetic to the point of hyperactivity.	Miles	2023-07-15 00:00:31-07
273	Tie a pork chop around it neck to get the dog to play with it	\N	\N	Kieth	2023-07-15 00:00:32-07
274	Color me pink	\N	\N	Miles	2023-07-15 00:00:33-07
275	Like lemmings to the sea	\N	\N	Miles	2023-07-15 00:00:34-07
276	A scholar and a gentleman	A scholar and a gentleman	Someone (usually a male, due to the gender implication o."gentleman") who is admirable or of high esteem. Although used sincerely as a compliment, it is generally bombastic and lighthearted in nature.	Miles	2023-07-15 00:00:35-07
277	Gone with the wind	Gone with the wind	A phrase used to describe something that has disappeared, passed, or vanished, permanently or completely. The phrase was popularized by Margaret Mitchell’s 1936 novel of the same name.	Miles	2023-07-15 00:00:36-07
278	Old hat	Old hat	Unoriginal, out of date, or old-fashioned.	Eve	2023-07-15 00:00:37-07
279	Doesn’t fit the mold	\N	\N	Miles	2023-07-15 00:00:38-07
280	Left a bad taste in your mouth	Leave a bad taste in (one’s) mouth	To give one a negative impression (based on something that has already happened).	\N	2023-07-15 00:00:39-07
281	Cold shoulder	Cold shoulder	\N	Miles	2023-07-15 00:00:40-07
282	Tongue in cheek	(with) tongue in cheek	Humorous or intended as a joke, though seeming or appearing to be serious.	Eve	2023-07-15 00:00:41-07
283	When there’s a will there’s a way	\N	\N	Miles	2023-07-15 00:00:42-07
284	No harm no foul	No harm, no foul	If there was no bad outcome to an action, then there’s no need to be angry or upset about it.	Eve	2023-07-15 00:00:43-07
285	Cut the chord	\N	\N	Miles	2023-07-15 00:00:44-07
286	Hit the hay	Hit the hay	To get into bed and go to sleep.	Miles	2023-07-15 00:00:45-07
287	Live by the sword die by the sword	Live by the sword, die by the sword	Those who live a violent lifestyle will usually die a violent death.	Miles	2023-07-15 00:00:46-07
288	Knocking boots	Knock boots (with one)	To have sex (with one).	Miles	2023-07-15 00:00:47-07
289	Bumping uglies	Bump uglies	To have sex.	Miles	2023-07-15 00:00:48-07
682	Hill i’m willing to die on	\N	\N	Miles	2023-08-09 00:00:10-07
290	Get your ears lowered	Get (one’s) ears lowered	To get a haircut, especially to a length that reveals one’s ears.	Miles	2023-07-15 00:00:49-07
291	Dragging your feet	Drag (one’s) feet	Literally, to not completely pick up one’s feet when walking, so that they drag with each step.	Miles	2023-07-15 00:00:50-07
292	With your tail between your legs	With (one’s) tail between (one’s) legs	Displaying embarrassment or shame, especially after losing or having to admit that one was wrong. Likened to a dog literally putting its tail between its legs after being disciplined.	Miles	2023-07-15 00:00:51-07
293	Spic and span	Spick and span	Totally clean and/or organized.	Miles	2023-07-15 00:00:52-07
294	Roll in the hay	Roll in the hay	A sexual encounter, often one considered casual.	Eve	2023-07-15 00:00:53-07
295	Run the gamut	Run the gamut	To cover or extend across a wide and varied range.	Miles	2023-07-15 00:00:54-07
296	If it was a snake it would of bit you	\N	\N	Eve	2023-07-15 00:00:55-07
297	If looks could kill	If looks could kill	An expression used when someone makes an angry or unpleasant face at someone, indicating that such an expression represents hostility.	Eve	2023-07-15 00:00:56-07
298	Staring daggers	\N	\N	Eve	2023-07-15 00:00:57-07
299	No skin off my back	Be no skin off (one’s) back	To be no cause of concern or interest to one; to pose one no difficulty, threat, or risk.	Eve	2023-07-15 00:00:58-07
356	Burning the midnight oil	Burn the midnight oil	To stay up late working on a project or task. The phrase refers to the outdated practice of using an oil lamp.	Mike	2023-07-16 00:00:56-07
357	Pass the torch	Pass the torch	To transfer or bestow one’s role, position, responsibilities, etc., to someone else.	Miles	2023-07-16 00:00:57-07
358	Butterflies in your stomach	Butterflies in (one’s) stomach	A feeling of nervousness.	\N	2023-07-16 00:00:58-07
359	The lady doth protest too much	The lady doth protest too much	Used to indicate that someone (not necessarily a woman) is only denying something so fervently because the opposite is actually true.	Eve	2023-07-16 00:00:59-07
360	Not all hero’s wear capes	\N	\N	\N	2023-07-16 00:01:00-07
361	Walking on eggshells	Be walking on eggshells	To be acting with great care and consideration so as not to upset someone.	\N	2023-07-16 00:01:01-07
414	Rule of thumb	Rule of thumb	An approximation; a suggested method or guideline.	\N	2023-07-16 00:01:54-07
362	Treading water	Tread water	To move one’s feet and hands in a motion that will allow one to keep one’s head above the surface of the water.	\N	2023-07-16 00:01:02-07
363	Keeping your head above water	Keep (one’s) head above water	Literally, to hold one’s head out of the water as to avoid drowning.	\N	2023-07-16 00:01:03-07
364	Under the table	Under the table	Secretly (often because what is being done is illegal).	\N	2023-07-16 00:01:04-07
365	Tables have turned	\N	\N	\N	2023-07-16 00:01:05-07
366	Deep-6	Deep six	\N	\N	2023-07-16 00:01:06-07
367	6 feet under	\N	\N	\N	2023-07-16 00:01:07-07
368	Look on the bright side	Look on the bright side	To highlight the good in an otherwise bad situation.	\N	2023-07-16 00:01:08-07
369	Casting a wide net	Cast a wide net	To do something that will attract, appeal to, or include as large or diverse a group of people as possible.	\N	2023-07-16 00:01:09-07
371	Food for thought	Food for thought	Something to consider.	\N	2023-07-16 00:01:11-07
372	Penny pinching	Penny pincher	Someone who is extremely frugal or miserly with their money; someone who is very unwilling or reluctant to spend.	\N	2023-07-16 00:01:12-07
373	Cream of the crop	The cream of the crop	The best of a particular group.	\N	2023-07-16 00:01:13-07
218	The Blood of the covenant is thicker than the water of the womb	\N	\N	Eve	2023-07-14 01:31:00-07
698	Staying in your own lane	\N	\N	Miles	2023-08-11 00:00:07-07
374	Separate the wheat from the chaff	Separate the wheat from the chaff	To separate the good or valuable from that which is inferior.	\N	2023-07-16 00:01:14-07
375	Reel it in	Reel in	To draw someone or something toward oneself by winding in a line. A noun or pronoun can be used between "reel" and "in.".	\N	2023-07-16 00:01:15-07
376	Right hand man	Right-hand man	One’s primary or most trusted assistant. Not necessarily a man.	\N	2023-07-16 00:01:16-07
377	No man is an island	No man is an island(, entire of itself)	A person requires the company and support of others and society as a whole in order to thrive. The line is from John Donne’.	Eve	2023-07-16 00:01:17-07
378	Revenge is a dish best served cold	Revenge is a dish best served cold.	Revenge that takes place far in the future, after the offending party has forgotten how they wronged someone, is much more satisfying.	Eve	2023-07-16 00:01:18-07
379	Opportunity is not a lengthy visitor	\N	\N	Eve	2023-07-16 00:01:19-07
380	If you want to make an omelette you have to break some eggs.	\N	\N	\N	2023-07-16 00:01:20-07
381	Give ‘em enough rope to hang himself with	\N	\N	\N	2023-07-16 00:01:21-07
382	Kick them while they’re down	\N	\N	Miles	2023-07-16 00:01:22-07
432	Paint yourself into a corner	Paint (oneself) into a corner	To create a predicament or unpleasant situation for oneself whereby there are no or very few favorable solutions or outcomes.	\N	2023-07-17 00:00:17-07
383	Tying the knot	Tie the knot	To get married. An allusion to the handfasting ceremony, an ancient tradition of binding the hands of the bride and groom with lengths of cloth, cord, rope, etc., as a symbol of their lasting union.	Miles	2023-07-16 00:01:23-07
384	Tie up loose ends	Tie up (some/a few) loose ends	To take care of, finish, or resolve some issues or pieces of business that are not critical but have remained outstanding.	Miles	2023-07-16 00:01:24-07
385	If it ain’t broke don’t fix it	If it ain’t broke, don’t fix it	If something is performing or functioning well enough, there’s no need to change or interfere with it (as you may introduce new problems as a result..	Mike	2023-07-16 00:01:25-07
386	My ears are burning	(one’s) ears are burning	One intuits that people were talking about them, despite not witnessing it.	Mike	2023-07-16 00:01:26-07
387	The ball is in your court	The ball is in (one’s) court	One has the responsibility for further action, especially after someone else previously held responsibility. The phrase originated in tennis.	Mike	2023-07-16 00:01:27-07
389	As right as rain	(as) right as rain	In good health or order; feeling or working just as someone or something should.	\N	2023-07-16 00:01:29-07
390	The bark is worse than the bite	\N	\N	\N	2023-07-16 00:01:30-07
391	Path of least resistance	The path of least resistance	The thing, option, or course of action that is easiest to do; that which avoids confrontation, difficulty, awkwardness, or tension.	\N	2023-07-16 00:01:31-07
766	Run of the mill	Run-of-the-mill	Common, standard, or average; mediocre.	Miles	2023-08-20 00:00:01-07
398	To flesh out	\N	\N	\N	2023-07-16 00:01:38-07
392	Keeping me on my toes	Keep (one) on (one’s) toes	To force someone to stay active, alert, and focused on something or someone.	\N	2023-07-16 00:01:32-07
393	Go touch grass	\N	\N	\N	2023-07-16 00:01:33-07
394	In a pickle	In a pickle	In a troublesome or difficult situation. The adjectives "pretty" and "right" are commonly used before "pickle".	\N	2023-07-16 00:01:34-07
395	Caught with your hand in the cookie jar	Caught with (one’s) hand in the cookie jar	To have been caught in the act or attempt of some wrongdoing, especially one involving bribery or the illicit exploitation of one’s position of power or authority.	\N	2023-07-16 00:01:35-07
396	Trim the fat	Trim the fat	To excise or discard elements that are seen as superfluous or unnecessary.	\N	2023-07-16 00:01:36-07
397	Taking candy from a baby	\N	\N	\N	2023-07-16 00:01:37-07
399	Get ahead of the game	Get ahead of the game	To become prepared for or begin work on something ahead of schedule.	\N	2023-07-16 00:01:39-07
400	In the trenches	(down) in the trenches	The place, situation, or environment in which the most difficult or demanding work takes place.	\N	2023-07-16 00:01:40-07
401	Cross that bridge when we come to it	Cross that bridge when (one) comes to it	To address something only when it actually happens or becomes an issue.	\N	2023-07-16 00:01:41-07
402	Take at at face value	\N	\N	\N	2023-07-16 00:01:42-07
403	Toe the line	Toe the line	To adhere to the rules of something. (Often misspelled as "tow the line.".	\N	2023-07-16 00:01:43-07
404	Draw a line in the sand	Draw a line in the sand	To establish a figurative boundary that someone or some group refuses to cross or beyond which no further advance or compromise is accepted.	\N	2023-07-16 00:01:44-07
405	On framing time	\N	\N	\N	2023-07-16 00:01:45-07
406	Hold my beer	Hold my beer	A phrase indicating that one is about to do something stupid or dangerous. The image is that of a person at a party who asks a friend to hold their beer so that they can attempt some kind of ill-advised stunt. It is often used humorously to describe how something bad was followed by something even worse.	\N	2023-07-16 00:01:46-07
407	Don’t feed them after midnight	\N	\N	\N	2023-07-16 00:01:47-07
408	Short end of the stick	The short end of the stick	An unequal outcome of a deal that results in a disadvantage or burden.	\N	2023-07-16 00:01:48-07
409	Beating a dead horse	Beat a dead horse	To continue to focus on an issue or topic that is no longer of any importance or relevance.	\N	2023-07-16 00:01:49-07
410	Slippery fish	\N	\N	\N	2023-07-16 00:01:50-07
411	Snake in the grass	Snake in the grass	One who feigns friendship with the intent to deceive.	\N	2023-07-16 00:01:51-07
412	Sit back and rest on your laurels	\N	\N	Eve	2023-07-16 00:01:52-07
413	Barefoot and pregnant	Negative connotations	A common assumption is that the expression relates t.	Eve	2023-07-16 00:01:53-07
582	Wrapped around their little finger	\N	\N	Eve	2023-07-17 00:10:00-07
415	Ring a bell	Ring a bell	To seem familiar, remind one of something, or stimulate an incomplete or indistinct memory.	\N	2023-07-16 00:01:55-07
669	Jump the gun	Jump the gun	To start something before it is permissible, appropriate, or advisable. The phrase alludes to starting to run in a foot race before the starting gun goes off.	\N	2023-08-08 00:00:11-07
670	Show you the ropes	Show (one) the ropes	To explain or demonstrate to one how to do or perform a job, task, or activity.	\N	2023-08-08 00:00:12-07
671	Getting something under your belt	Get (something) under (one’s) belt	To get something to eat or drink.	\N	2023-08-08 00:00:13-07
672	Shit a brick	Shit a brick	To be very scared or nervous. The plural ("shit bricks") is also commonly used.	\N	2023-08-08 00:00:14-07
673	Balls to the wall	Balls to the wall	With maximum effort, energy, or speed, and without caution or restraint.	\N	2023-08-09 00:00:01-07
388	Once in a blue moon	Once in a blue moon	Very rarely.	Mike	2023-07-16 00:01:28-07
534	Bone to pick	A bone to pick	An issue to discuss—typically one that is a source of annoyance for the speaker.	Miles	2023-07-19 00:00:54-07
421	Strike while the iron is hot	Strike while the iron is hot	To make most of an opportunity or favorable conditions while one has the chance to do so.	\N	2023-07-17 00:00:06-07
422	Set in stone	Set in stone	Permanent. Typically refers to a plan or idea.	\N	2023-07-17 00:00:07-07
424	Trail of bread crumbs	\N	\N	\N	2023-07-17 00:00:09-07
425	Hanging on by a thread	Hang on by a thread	To be perilously close to failing, dying, or resulting in a bad outcome.	\N	2023-07-17 00:00:10-07
426	Green thumb	Green thumb	A proclivity for successfully growing plant life. (Often used with "have.".	\N	2023-07-17 00:00:11-07
427	Splitting hairs	Split hairs	To make or focus on trivial or petty details, differences, or distinctions.	\N	2023-07-17 00:00:12-07
428	Beast of burden	Beast of burden	A domesticated animal used by humans to carry or pull heavy loads.	\N	2023-07-17 00:00:13-07
429	Hang me out to dry	Hang (one) out to dry	To desert one in a troubling situation.	\N	2023-07-17 00:00:14-07
430	With out a pot to piss in or a window to throw it out of	\N	\N	\N	2023-07-17 00:00:15-07
431	Without a leg to stand in	\N	\N	\N	2023-07-17 00:00:16-07
596	Bury the hatchet	Bury the hatchet	To make peace with someone.	\N	2023-07-23 00:00:16-07
433	Shooting from the hip	Shoot from the hip	To speak or act rashly, recklessly, or bluntly, without consideration of potential consequences. An allusion to firing a handgun immediately upon drawing it from its holster without taking time to aim.	\N	2023-07-17 00:00:18-07
434	Outside of my wheelhouse	Out(side) (of) (someone’s) wheelhouse	Against, outside of, or not matching someone’s general interests, abilities, or area of familiarity; outside of someone’s comfort zone.	\N	2023-07-17 00:00:19-07
435	Above my pay grade	Above (one’s) pay grade	The responsibility of those who are of a higher authority than oneself, denoted by the level of pay that one receives in comparison to one’s superiors.	\N	2023-07-17 00:00:20-07
436	Caught in the crosshairs	\N	\N	\N	2023-07-17 00:00:21-07
437	Target on you back	\N	\N	\N	2023-07-17 00:00:22-07
438	Price on your head	\N	\N	\N	2023-07-17 00:00:23-07
439	Death by 1000 cuts	\N	\N	Miles	2023-07-17 00:00:24-07
440	Can’t trust them as far as you can throw them	\N	\N	\N	2023-07-17 00:00:25-07
441	Throw caution to the wind	Throw caution to the wind(s)	To abandon one’s cautiousness in order to take a risk.	\N	2023-07-17 00:00:26-07
442	Hold your horses	Hold your horses	Wait a moment or be patient (often because you are moving too quickly or thoughtlessly).	\N	2023-07-17 00:00:27-07
767	Off the cuff	Off the cuff	Casually and spontaneously; without planning or preparation. Often hyphenated.	Miles	2023-08-20 00:00:02-07
443	Bring a knife to a gunfight	Bring a knife to a gunfight	To come poorly prepared or equipped for some task, goal, competition, or confrontation. Often used in the negative as a forewarning or piece of advice.	\N	2023-07-17 00:00:28-07
444	Mexican standoff	Mexican standoff	An impasse, deadlock, or stalemate from which no party involved will or can emerge victorious.	\N	2023-07-17 00:00:29-07
445	Play your cards right	Play (one’s) cards right	To act adeptly and with good judgment; to make the best and most effective use of the resources at one’s disposal.	\N	2023-07-17 00:00:30-07
446	Play your cards close to the chest	\N	\N	\N	2023-07-17 00:00:31-07
447	Ace up your sleeve	Ace up (one’s) sleeve	A secret plan, idea, or advantage that can be utilized if and when it is required. A reference to cheating at a card game by hiding a favorable card up one’s sleeve.	\N	2023-07-17 00:00:32-07
449	Hold your hand	Hold (one’s) hand	Literally, to grasp one’s hand and continue holding it, typically while walking together or sitting next to each other, often as a show of affection.	\N	2023-07-17 00:00:34-07
747	Sticking your foot in your mouth	\N	\N	Miles	2023-08-18 00:00:08-07
450	The 11th hour	The eleventh hour	The last possible moment or opportunity. Can be hyphenated if used as a modifier before a noun.	\N	2023-07-17 00:00:35-07
451	A real class act	\N	\N	\N	2023-07-17 00:00:36-07
452	For the birds	For the birds	Worthless, stupid, or completely undesirable.	\N	2023-07-17 00:00:37-07
453	Make ends meet	Make (both) ends meet	To earn just enough money to cover one’s living expenses.	\N	2023-07-17 00:00:38-07
454	Wear your heart on your sleeve	Wear (one’s) heart on (one’s) sleeve	To openly display or make known one’s emotions or sentiments.	\N	2023-07-17 00:00:39-07
455	Got it in the bag	\N	\N	\N	2023-07-17 00:00:40-07
456	Idle hands are the devils playground	\N	\N	\N	2023-07-17 00:00:41-07
457	Secure the bag	\N	\N	\N	2023-07-17 00:00:42-07
458	Slow your roll	Slow (one’s) roll	To calm oneself down. Primarily heard in US.	\N	2023-07-17 00:00:43-07
459	Off the beaten path	Off the beaten path	Little-known, or in a remote or lesser-known area.	\N	2023-07-17 00:00:44-07
460	Read em and weep	Read ’em and weep	Look at these results, which clearly show that I am the winner and you are the loser. A clichéd expression that is especially commonly used during card games.	\N	2023-07-17 00:00:45-07
461	My hands are tied	(one’s) hands are tied	One is being prevented from acting, helping, or intervening as one should or desires to because of circumstances beyond one’s control, such as rules, conflicting orders, or higher priorities.	\N	2023-07-17 00:00:46-07
462	With one had tied behind my back	\N	\N	\N	2023-07-17 00:00:47-07
463	Knock your dick in the dirt	\N	\N	Miles	2023-07-17 00:00:48-07
464	Moving the goalpost	Move the goalposts	To alter the rules or parameters of a situation in such a way as to suit one’s needs or objectives, making it more difficult for someone else to succeed, keep pace, or achieve an opposing objective.	\N	2023-07-17 00:00:49-07
465	Pulling the rug from under you	Pull the rug (out) from under (someone)	To suddenly or unexpectedly remove or rescind support, help, or assistance from someone; to abruptly leave someone in a problematic or difficult situation.	\N	2023-07-17 00:00:50-07
466	All roads lead to rome	All roads lead to rome	The same outcome can be reached by many methods or ideas. This phrase refers to the road system of the Roman Empire, in which Rome was positioned in the center, with every road attached to it.	\N	2023-07-17 00:00:51-07
467	Walk in the park	A walk in the park	A task or activity that is easy or effortless to accomplish.	\N	2023-07-17 00:00:52-07
468	Too many irons in the fire	Too many irons in the fire	An excessive number of simultaneous activities or potential undertakings or opportunities underway.	Mike	2023-07-16 01:00:00-07
469	Two tacos short of a combination plate	\N	\N	\N	2023-07-17 00:00:53-07
674	Deep dive	Deep dive	A thorough analysis, perhaps one that seems excessive or unwarranted for a particular topic.	\N	2023-08-09 00:00:02-07
219	Stabbed in the back	Stabbed in the back	Having had one’s confidence or trust betrayed.	\N	2023-07-14 01:32:00-07
448	Coming in hot	\N	\N	\N	2023-07-17 00:00:33-07
471	Burying your head in the sand	Bury (one’s) head in the sand	To avoid, or try to avoid, a particular situation by pretending that it does not exist. The phrase refers to the common but mistaken belief that ostriches bury their heads in the sand when frightened, so as to avoid being seen.	\N	2023-07-18 00:00:01-07
472	Burn a hole in your pocket	Burn a hole in (one’s) pocket	To be in one’s possession and causing one an intense urge to make use of it. Typically used in reference to money, suggesting that the person with the money feels the need to spend it quickly.	\N	2023-07-18 00:00:02-07
474	If you fall of your horse you gotta get back on	\N	\N	\N	2023-07-18 00:00:04-07
475	If you want to make god laugh make a plan	\N	\N	\N	2023-07-18 00:00:05-07
476	Gun shy	Gun-shy	Frightened of using a gun or by the sound of one firing.	\N	2023-07-18 00:00:06-07
477	Trigger happy	Trigger-happy	Eager to use a weapon, i.e. to pull the trigger (of a gun).	\N	2023-07-18 00:00:07-07
478	You can’t take it with you	(you) can’t take it with you (when you go)	A warning against materialism that alludes to the fact that you can’t keep your money or possessions when you die.	\N	2023-07-18 00:00:08-07
479	Doesn’t pack a punch	\N	\N	\N	2023-07-18 00:00:09-07
480	A drop in the bucket	Drop in the bucket	A tiny amount, especially when compared to a much larger one.	\N	2023-07-18 00:00:10-07
547	Don’t shoot the messenger	Don’t shoot the messenger	Don’t get angry at or punish someone who is simply delivering bad or undesirable news as they are not responsible for it.	\N	2023-07-20 00:00:11-07
846	Ride on someone’s coattails	\N	\N	Miles	2023-08-26 00:00:04-07
492	Lose the battle but win the war	Lose the battle, but win the war	To suffer a minor defeat or failure, but achieve a larger, more important, or overarching success or victory over time. The phrase is often split into two halves across different parts of a sentence to achieve its meaning.	Eve	2023-07-19 00:00:12-07
493	Uncharted waters	Uncharted waters	A situation or circumstance that is foreign, unclear, or unfamiliar and which may be dangerous or difficult as a result.	Miles	2023-07-19 00:00:13-07
495	Never look into another bowl except to see if they have enough	\N	\N	Eve	2023-07-19 00:00:15-07
496	A rose by any other name would smell as sweet	A rose by any other name (would smell as sweet)	What someone or something is called does not change their innate characteristics or attributes. The shorter version of the phrase is often used when describing undesirable people or things.	Eve	2023-07-19 00:00:16-07
497	He who laughs last laughs best	Have the last laugh	To ultimately achieve success after encountering adversity or doubt from others.	Eve	2023-07-19 00:00:17-07
498	Kiss the ring	Kiss the ring	To make a gesture of deference, fealty, or genuflection to a person of power or authority.	Eve	2023-07-19 00:00:18-07
499	A prison of our own device	\N	\N	Eve	2023-07-19 00:00:19-07
500	What goes around comes around	What goes around comes around	One’s actions or behavior will eventually have consequences for one, even if indirectly. The phrase typically refers to one being a victim of the same negative circumstances that they have inflicted on others.	Eve	2023-07-19 00:00:20-07
501	If your going to get we you might as well go swimming	\N	\N	Eve	2023-07-19 00:00:21-07
502	Don’t cry over spilt milk	\N	\N	\N	2023-07-19 00:00:22-07
503	Put someone on a pedestal	Put (someone or something) (up) on a pedestal	To believe or behave as if someone or something is perfect, wonderful, or better than others, to the extent that one is unable to see its potential flaws or faults.	Miles	2023-07-19 00:00:23-07
504	The view from your ivory tower	\N	\N	Eve	2023-07-19 00:00:24-07
505	On your high horse	On (one’s) high horse	Having an attitude of condescending moral superiority.	Eve	2023-07-19 00:00:25-07
506	Turn a blind eye	Turn a blind eye (to something)	To knowingly ignore some wrongdoing.	Miles	2023-07-19 00:00:26-07
507	Cat got your tongue	(has the) cat got your tongue?	A humorous question directed at one who is not speaking very much or at all.	Miles	2023-07-19 00:00:27-07
508	Hard nut to crack	A hard nut (to crack)	A person, thing, situation, or problem that is particularly difficult to understand, solve, or deal with.	Miles	2023-07-19 00:00:28-07
509	Up shit creek without a paddle	Up shit creek (without a paddle)	In a challenging or troublesome situation, especially one that cannot be easily resolved.	miles	2023-07-19 00:00:29-07
510	Even the Mona Lisa is falling apart	\N	\N	Eve	2023-07-19 00:00:30-07
511	Diamonds are made under pressure but not over night	\N	\N	Eve	2023-07-19 00:00:31-07
512	Men are from mars, women are from Venus	\N	\N	Eve	2023-07-19 00:00:32-07
513	Reopen an old wound	\N	\N	Miles	2023-07-19 00:00:33-07
514	Pour salt in the wound and expect it to heal	\N	\N	Eve	2023-07-19 00:00:34-07
515	Swimming with the fishes	Be swimming with the fishes	To be murdered and have one’s body disposed of in a river,lake, or ocean.	Miles	2023-07-19 00:00:35-07
516	Light at the end of the tunnel	Light at the end of the tunnel	A sign that something difficult or unpleasant is almost at an end.	Miles	2023-07-19 00:00:36-07
517	Pride is a cold bedfellow	\N	\N	Eve	2023-07-19 00:00:37-07
518	Cut off the head and the body will die	\N	\N	Eve	2023-07-19 00:00:38-07
519	The little dutch boy with his finger in the dike	\N	\N	Eve	2023-07-19 00:00:39-07
520	A hard pill to swallow	A hard pill to swallow	Something, especially a fact or piece of news, that is unpleasant or difficult but which is unavoidable or must be accepted.	Miles	2023-07-19 00:00:40-07
521	Nothing left to do but bite the bullet	\N	\N	Eve	2023-07-19 00:00:41-07
522	Bring home the bacon	Bring home the bacon	To earn money, as from steady employment. The phrase may originate from the fairground contest in which participants try to catch a greased pig in order to win it.	\N	2023-07-19 00:00:42-07
523	Butter your bread on both sides	Butter (one’s) bread on both sides	To benefit or profit from two or more separate and often contradictory or incompatible things or sources.	Eve	2023-07-19 00:00:43-07
525	The bigger the pants the deeper the pockets	\N	\N	Eve	2023-07-19 00:00:45-07
526	Ask me your questions I’ll tell you my lies	\N	\N	Eve	2023-07-19 00:00:46-07
527	In the belly of the beast	In the belly of the beast	Within the worst, most central area or part of something deeply unpleasant or malicious.	Miles	2023-07-19 00:00:47-07
528	Wild goose chase	Wild goose chase	A prolonged or chaotic search for something that is difficult to find (often because it does not exist).	Miles	2023-07-19 00:00:48-07
529	Jack of all trades	Jack of all trades	A person who is skilled in many different areas.	Miles	2023-07-19 00:00:49-07
530	Cut the mustard	Cut the mustard	\N	Miles	2023-07-19 00:00:50-07
531	Don’t pull the wool over my eyes	\N	\N	Miles	2023-07-19 00:00:51-07
532	Shoot yourself in the foot	Shoot (oneself) in the foot	To damage or impede one’s own plans, progress, or actions through foolish actions or words.	Miles	2023-07-19 00:00:52-07
533	Salad days	Salad days	A youthful, carefree time of innocence and inexperience. The phrase comes from a line in Shakespeare’.	Miles	2023-07-19 00:00:53-07
930	Shake a leg	\N	\N	Christina	2023-09-01 00:00:06-07
537	Taste of your own medicine	A taste of (one’s) own medicine	An experience of the same harmful or unpleasant thing that one has inflicted on others; an attack in the same manner in which one attacks others.	\N	2023-07-20 00:00:01-07
538	March to the best of your own drum	\N	\N	\N	2023-07-20 00:00:02-07
539	Cross your heart and hope to die	\N	\N	\N	2023-07-20 00:00:03-07
540	Scraping the bottom of the barrel	Scrape the bottom of the barrel	To use or select from the last or worst of the resources or options from a particular range or set, even if they are not satisfactory, because there are no others to choose from.	\N	2023-07-20 00:00:04-07
541	Gift that keeps on giving	The gift that keeps on giving	Something that continues to have a payoff, consequences, or other such impact.	\N	2023-07-20 00:00:05-07
542	Let me sleep on it	\N	\N	\N	2023-07-20 00:00:06-07
543	Don’t sleep on it	\N	\N	\N	2023-07-20 00:00:07-07
544	Down the rabbit hole	Down a/the rabbit hole	In a situation, process, or journey that is particularly strange, problematic, difficult, complex, or chaotic, especially one that becomes increasingly so as it develops or unfolds. (An allusion t.	\N	2023-07-20 00:00:08-07
545	Level the playing field	Level the playing field	To make a situation or activity more fair and balanced by giving an extra advantage or opportunity to those who would normally be at a disadvantage, or by attempting to take away or diminish advantages, perhaps of one’s adversary or competitor.	\N	2023-07-20 00:00:09-07
546	Your ass is grass	(one’s) ass is grass	\N	\N	2023-07-20 00:00:10-07
847	Shit rolls down hill	\N	\N	Eve	2023-08-26 00:00:05-07
548	Don’t hate the player hate the game	Don’t hate the player, hate the game	You should hate a system or situation rather than the people involved in it.	\N	2023-07-20 00:00:12-07
549	Bucket list	Bucket list	A list of accomplishments or tasks one hopes to do or achieve before one dies.	\N	2023-07-20 00:00:13-07
550	Partner in crime	Partner in crime	One who aids or accompanies someone in crimes or nefarious actions.	\N	2023-07-20 00:00:14-07
551	Anyway you slice it	\N	\N	\N	2023-07-20 00:00:15-07
552	All is fair in love and war	All is fair in love and war	Otherwise questionable actions are acceptable under extenuating circumstances. Often written as "all’s fair in love and war.".	\N	2023-07-20 00:00:16-07
553	Above my pay grade	Above (one’s) pay grade	The responsibility of those who are of a higher authority than oneself, denoted by the level of pay that one receives in comparison to one’s superiors.	\N	2023-07-20 00:00:17-07
554	Not on my dime	\N	\N	\N	2023-07-20 00:00:18-07
556	Rubbing elbows	Rub elbows	To interact or mingle with a person or group.	\N	2023-07-20 00:00:20-07
557	Beating around the bush	Beat around the bush	To speak vaguely or euphemistically so as to avoid talking directly about an unpleasant or sensitive topic. Primarily heard in US.	\N	2023-07-20 00:00:21-07
558	Keep your friends close and your enemies closer	Keep your friends close and your enemies closer	Be very aware of your enemies’ behavior in order to detect and avoid any malicious actions.	\N	2023-07-20 00:00:22-07
559	Keep your eyes on the prize	Keep your eye(s) on the prize	To remain focused on a particular goal or award, especially when the path to it is long or arduous.	\N	2023-07-20 00:00:23-07
560	Under the radar	Under (the/one’s) radar	Without being noticed, detected, or addressed.	\N	2023-07-20 00:00:24-07
561	Take under your wing	\N	\N	\N	2023-07-20 00:00:25-07
562	Straw that broke the camel’s back	The straw that breaks the camel’s back	A seemingly small or inconsequential issue, problem, or burden that proves to be the final catalyst in causing an overworked or overburdened person, system, organization, etc., to fail, give up, or collapse.	\N	2023-07-20 00:00:26-07
563	Late in the game	Late in the game	At a late point in some situation, development, activity, etc. Likened to an athletic game or match.	\N	2023-07-20 00:00:27-07
564	Last straw	The last straw	The final problem, setback, or source of irritation in a series that causes one to finally lose patience or for something to stop working.	\N	2023-07-20 00:00:28-07
565	Connect the dots	Connect the dots	Literally, to draw a line between dots, often as part of a children’s activity to create an illustration or design.	\N	2023-07-20 00:00:29-07
567	When push comes to shove	If push comes to shove	If the situation deteriorates or becomes desperate; if drastic measures are needed.	\N	2023-07-20 00:00:31-07
568	Been around the block	Been around (the block)	To have experience, either in a particular area or in one’s life overall.	\N	2023-07-20 00:00:32-07
569	Eye for an eye	Eye for an eye (and a tooth for a tooth).	If someone hurts you, you should punish the offender by hurting him or her in the same way. (An ancient principle of justice going back to biblical times..	\N	2023-07-20 00:00:33-07
570	Eyes in the back of your head	Eyes in the back of (one’s) head	The ability to detect what is going on all around one, even beyond one’s field of vision.	\N	2023-07-20 00:00:34-07
571	In the clear	In the clear	Deemed innocent or able to avoid blame for some crime or misdeed.	\N	2023-07-20 00:00:35-07
572	Cold turkey	Cold turkey	The abrupt cessation of something (most often the use of a drug).	\N	2023-07-20 00:00:36-07
573	We’re gonna need a bigger boat	\N	\N	\N	2023-07-20 00:00:37-07
574	It’s all greek to me	(it’s) (all) greek to me	This might as well be a foreign language, because I don’t understand it at all. The phrase comes from Shakespeare’s pla.	\N	2023-07-20 00:00:38-07
575	How do you like them apples	How do you like them apples	A phrase used to draw attention to one’s cleverness or superiority to the one being addressed, especially after a recent triumph.	\N	2023-07-20 00:00:39-07
576	Break the mold	Break the mold	To do something in a new way.	\N	2023-07-20 00:00:40-07
577	Worth your weight in salt	\N	\N	\N	2023-07-20 00:00:41-07
578	Turn on a dime	Turn on a dime	To turn very quickly and with great agility.	\N	2023-07-20 00:00:42-07
579	Hold down the fort	Hold (down) the fort	To maintain the proper functioning or order of some situation or place, typically during someone’s absence.	\N	2023-07-20 00:00:43-07
580	I’m all ears	I’m all ears	I’m ready and eager to hear what you have to say.	Miles	2023-07-23 00:00:01-07
675	Kick rocks	Kick rocks	An expression of disdain used to tell someone to go away or quit bothering one.	\N	2023-08-09 00:00:03-07
581	Bend over backwards	Bend over backward(s)	To exert a lot of effort towards some end. This phrase is often used to express frustration when one’s efforts go unrecognized.	\N	2023-07-23 00:00:02-07
583	No spring chicken	No spring chicken	No longer young or youthful. (A "spring chicken" refers to a young chicken..	Eve	2023-07-23 00:00:03-07
584	Counting sheep	Count sheep	To perform any repetitive or monotonous thought exercise as a means of calming the mind to try to fall asleep (such as the traditional sleep aid of counting imaginary sheep).	Eve	2023-07-23 00:00:04-07
585	Leg up in life	\N	\N	Eve	2023-07-23 00:00:05-07
586	Put your pants on one leg at a time	Put (one’s) pants on one leg at a time (just like everybody else)	To be an ordinary human being; to go through life like everyone else. (Used especially in reference to someone who is of an elevated social status, such as a celebrity, star athlete, member of royalty, etc.	Eve	2023-07-23 00:00:06-07
587	Boots on the ground	Boots on the ground	Soldiers who are on active duty and physically present during a combat operation.	Eve	2023-07-23 00:00:07-07
588	Down to the nitty gritty	\N	\N	Eve	2023-07-23 00:00:08-07
589	Knock on wood	Knock on wood	A superstitious expression said, typically in combination with actually touching or knocking on a wooden object or surface, when one desires something positive to continue, lest the mention of i."jinx" or somehow reverse one’s good fortune.	\N	2023-07-23 00:00:09-07
590	Salt of the earth	The salt of the earth	A person or group that is regarded as genuine, unpretentious, and morally sound. This phrase is typically complimentary.	\N	2023-07-23 00:00:10-07
591	Under the weather	Under the weather	Mildly ill.	\N	2023-07-23 00:00:11-07
592	Fly in in the ointment	\N	\N	\N	2023-07-23 00:00:12-07
593	Nothing to write home about	Nothing to write home about	Not especially impressive, remarkable, or noteworthy; rather dull, mediocre, uninteresting, or unimportant.	\N	2023-07-23 00:00:13-07
594	A hired gun	\N	\N	\N	2023-07-23 00:00:14-07
595	Dropped the ball	Drop the ball	To make a mistake.	\N	2023-07-23 00:00:15-07
597	Open the floodgates	Open the floodgates	To allow for an expanding number of (typically negative) consequences as the result of another related action.	\N	2023-07-23 00:00:17-07
598	See a man about a horse	See a man about a horse	To leave somewhere without explaining where one is going, but usually used as an obvious euphemism for going to the toilet or getting an alcoholic drink.	\N	2023-07-23 00:00:18-07
599	Taken with a grain of salt	Take (something) with a grain of salt	To consider or evaluate something, such as a statement, with the understanding that it may not be completely true or accurate, typically due to the unreliability of the source.	\N	2023-07-23 00:00:19-07
600	Trust you as far as i can throw you	\N	\N	\N	2023-07-23 00:00:20-07
601	You made your bed now you got to lay in it	\N	\N	\N	2023-07-23 00:00:21-07
602	Rolling with the punches	Roll with the punches	Literally, in martial arts (especially boxing), to maneuver one’s body away from a blow so as to lessen the force of the impact.	\N	2023-07-23 00:00:22-07
603	Two way street	Two-way street	A situation in which both sides must put forth an equal amount of effort to achieve a desired result.	Eve	2023-07-24 00:00:01-07
604	Double down	Double down	In blackjack, to double one’s wager after seeing one’s initial hand of cards, with only one more card allowed to be drawn afterward.	Eve	2023-07-23 00:00:23-07
605	Stand your ground	Stand (one’s) ground	To brace oneself and maintain one’s position during or when anticipating an attack.	Eve	2023-07-23 00:00:24-07
606	Dust your shoulders off	\N	\N	Eve	2023-07-23 00:00:25-07
607	Blowing steam	\N	\N	Miles	2023-07-24 00:00:02-07
608	Thrown to the wolves	Wolf	\N	Eve	2023-07-24 00:00:03-07
609	Throw under the bus	Throw (one) under the bus	To exploit one’s trust for an ulterior purpose, advantage, or agenda; to harm one through deceit or treachery.	Eve	2023-07-24 00:00:04-07
610	Raised by wolves	Raised by wolves	Of or describing someone who seems particularly uncouth or socially inept.	Eve	2023-07-24 00:00:05-07
611	Leaving a trail of breadcrumbs	\N	\N	Eve	2023-07-24 00:00:06-07
612	Get with the program	Get with the program	To conform or fall in line with what is expected.	Miles	2023-07-24 00:00:07-07
613	Water under the bridge	Water under the bridge	A prior issue that is now resolved or considered resolved.	\N	2023-07-24 00:00:08-07
615	On the shoulders with of giants	\N	\N	Eve	2023-07-25 00:00:01-07
616	Pull out all the stops	Pull out all the stops	To do something with maximum effort or ability; to use all or the best available resources when doing something.	Eve	2023-07-24 00:00:10-07
617	Steal their thunder	Steal (one’s) thunder	To garner the attention or praise that one had been expecting or receiving for some accomplishment, announcement, etc.	Eve	2023-07-24 00:00:11-07
618	Wash your hands of the whole affair	\N	\N	Eve	2023-07-24 00:00:12-07
619	Break the bank	Break the bank	To be very expensive. The phrase is often used in the negative to convey the opposite.	\N	2023-07-25 00:00:02-07
620	Speak of the devil and he shall appear	Speak of the devil, and he shall appear	An acknowledgment of a person who has arrived just as or after they were being discussed.	\N	2023-07-25 00:00:03-07
621	Curiosity killed the cat but satisfaction brought it back	\N	\N	\N	2023-07-25 00:00:04-07
622	Wake up and smell the coffee	Wake up and smell the coffee	Pay attention to what is happening.	\N	2023-07-25 00:00:05-07
623	You can’t put the toothpaste back in the tube	Put the toothpaste back in the tube	To attempt to revert a situation to how it formerly existed by containing, limiting, or repressing information, ideas, advancements, etc., that have become commonplace or public knowledge. Almost always used in the negative to denote the impossibility of such an attempt.	\N	2023-07-25 00:00:06-07
624	A pictures worth a 1000 words	\N	\N	\N	2023-07-25 00:00:07-07
625	Doing the lord’s work	\N	\N	\N	2023-07-25 00:00:08-07
626	When small men cast long shadows the day is almost over	\N	\N	\N	2023-07-25 00:00:09-07
627	Meat and potatoes	Meat-and-potatoes	Concerned with or pertaining to the most basic or fundamental aspects of something.	\N	2023-07-25 00:00:10-07
628	Beating your head against the wall	Beat (one’s) head against a/the wall	To attempt continuously and fruitlessly to accomplish some task or achieve some goal that is or seems ultimately hopeless.	\N	2023-07-25 00:00:11-07
629	Barking up the wrong tree	Bark up the wrong tree	To attempt or pursue a futile course of action, often by making some kind of suggestion or request.	\N	2023-07-25 00:00:12-07
630	Falling on deaf ears	Fall on deaf ears	To be ignored.	\N	2023-07-25 00:00:13-07
631	Don’t ask how the sausage is made	\N	\N	\N	2023-07-25 00:00:14-07
696	Play it by ear	Play by ear	\N	Miles	2023-08-11 00:00:05-07
697	Getting something off your chest	get (something) off (one’s) chest	To reveal or discuss something that has caused one emotional discomfort and that one has repressed, kept hidden, or neglected to discuss earlier.	Miles	2023-08-11 00:00:06-07
702	Throw me a bone	Throw (one) a bone	To attempt to appease or placate someone by giving them something trivial or of minor importance or by doing some small favor for them. (A reference to giving a dog a bone or scrap from a bigger portion of food..	Miles	2023-08-13 00:00:01-07
704	Spill the tea	Spill the tea	To share or reveal gossip. "Tea" is a slang term for gossip.	Christina	2023-08-13 00:00:03-07
632	The emperor’s new clothes	The emperor’s new clothes	Something widely accepted as true or professed as being praiseworthy due to an unwillingness of the general population to criticize it or be seen as going against popular opinion. Taken from the Hans Christian Andersen fable of the same name, in which a vain king is sold imaginary clothing (i.e., nothing at all) by two weavers who promise him that it is visible only to the wise and cannot be seen by those who are ignorant, incompetent, or unfit for their position.	\N	2023-07-25 00:00:15-07
633	Kick into gear	\N	\N	\N	2023-07-25 00:00:16-07
634	Shooting the shit	Shoot the shit	To chat or converse aimlessly or casually, without any serious topic of conversation.	\N	2023-07-25 00:00:17-07
635	Something’s rotten in denmark	Something is rotten in (the state of) denmark	Something strange or suspicious is going on.	Eve	2023-07-26 00:00:01-07
636	Exit stage left	Exit stage left	An allusion to stage directions in theater, indicating when (and where) an actor should leave the stage from a scene.	Miles	2023-07-26 00:00:02-07
637	Waiting for the dust to settle	Wait for the dust to settle	To wait until a disturbance or commotion has lessened or been resolved.	Miles	2023-07-26 00:00:03-07
638	Throw dust in your eyes	Throw dust in (one’s) eyes	To mislead or deceive one by presenting or introducing distracting or obfuscating information.	Eve	2023-07-26 00:00:04-07
639	Achilles heel	Achilles’ heel	A weakness or vulnerability that can lead to permanent destruction or downfall. In Greek mythology, the hero Achilles was killed after being struck in the heel—the only weak spot on his body.	Miles	2023-07-26 00:00:05-07
640	A chain is only as strong as it’s weakest link	\N	\N	Miles	2023-07-26 00:00:06-07
641	A chink in the armor	Chink in (one’s)/the armor	A minor but very detrimental flaw or weakness.	Eve	2023-07-26 00:00:07-07
642	Missing link	Missing link	A hypothetical extinct animal that is believed to be the evolutionary connection between man and ape.	Miles	2023-07-26 00:00:08-07
643	Changing gears	Change gear	Literally, to switch a car, bicycle, or other vehicle into a different gear.	Matt	2023-07-27 00:00:01-07
768	Dark night of the soul	Poem and treatise of st. john of the cross	\N	Eve	2023-08-20 00:00:03-07
644	When you hear hoofbeats think horses not zebras	When you hear hoofbeats, think horses, not zebras.	The simplest, most common, or most obvious explanation for something is most likely the correct one. Used especially in relation to medical diagnoses.	Matt	2023-07-27 00:00:02-07
645	In over your head	In over (one’s) head	Too deeply involved in or with a difficult situation, beyond the point of being able to control or cope any longer.	\N	2023-07-27 00:00:03-07
646	Plenty of fish in the sea	There are plenty of (other) fish in the sea	There are many other excellent or more suitable people, things, opportunities, or possibilities in the world that one may find. Said especially when one has recently been unlucky, unsuccessful, or has broken up with a romantic partner.	\N	2023-07-27 00:00:04-07
647	My dogs are barking	(one’s) dogs are barking	One’s feet are very sore and tired from physical exertion.	\N	2023-07-27 00:00:05-07
649	Put your money where your mouth is	Put (one’s) money where (one’s) mouth is	To do, live up to, or follow through on something one talks about, threatens, or promises, especially (but not always) when it involves spending money.	\N	2023-07-27 00:00:07-07
650	Maiden voyage	Maiden voyage	The first time a vehicle, especially a boat or ship, departs on a journey.	\N	2023-07-27 00:00:08-07
651	No guts no glory	No guts, no glory	Success does not come without the courage to take risks.	\N	2023-07-27 00:00:09-07
652	Flash in the pan	Flash in the pan	Someone or something whose success or popularity is short-lived.	\N	2023-07-27 00:00:10-07
653	It’s better to burn out than fade away	\N	\N	\N	2023-07-27 00:00:11-07
654	Left in the lurch	Leave (one) in the lurch	To leave or abandon one without assistance in a particularly awkward, difficult, or troublesome situation.	\N	2023-07-27 00:00:12-07
655	High and dry	High and dry	Literally, dry and unaffected by water, typically flood waters.	\N	2023-07-27 00:00:13-07
656	Bury the lead	Bury the lead	In journalism, to open a news article with secondary or superfluous information, thus relegating the central premise (the lead, which usually occupies this position) to a later part.	\N	2023-07-27 00:00:14-07
657	The sky is the limit	The sky’s the limit	Anything is possible.	\N	2023-07-27 00:00:15-07
658	A rising tide lifts al boats	\N	\N	\N	2023-07-27 00:00:16-07
676	Takes the cake	Take the cake	To be the worst in a series of negative actions. Primarily heard in US.	Miles	2023-08-09 00:00:04-07
677	Wrap it up	Wrap it up	To get to the point of what one is saying. Often used as an imperative.	Miles	2023-08-09 00:00:05-07
678	Cut some slack	Cut (one) some slack	To allow one more latitude or freedom than usual; to be more lenient with one.	Miles	2023-08-09 00:00:06-07
679	When shit hits the fan	(the) shit hits the fan	Things have become suddenly very chaotic, disastrous, difficult, or controversial.	Miles	2023-08-09 00:00:07-07
680	Under the sun	Under the sun	On earth; in existence.	Christina	2023-08-09 00:00:08-07
681	Gravy train	The gravy train	A state, position, or job in which one makes an excessive amount of money without expending much or any effort.	Miles	2023-08-09 00:00:09-07
683	Let your hair down	Let (one’s) hair down	To cease acting formally or conservatively; to ignore or relinquish one’s inhibitions or reservations. Also worded as "let down (one’s) hair".	Christina	2023-08-09 00:00:11-07
685	Kick to the curb	Kick (someone or something) to the curb	To discard, abandon, or dismiss someone or something that has become redundant, obsolete, useless, or unwanted.	Christina	2023-08-09 00:00:13-07
686	Clean slate	Clean slate	An opportunity to start fresh despite past mistakes or problems.	Christina	2023-08-09 00:00:14-07
687	On top of the world	On top of the world	Elated; blissfully or triumphantly happy.	Miles	2023-08-09 00:00:15-07
689	Nothing to hang your hat on	\N	\N	\N	2023-08-09 00:00:17-07
690	Pull some strings	Pull (some/a few) strings	To use the power or influence one has over others, especially people of importance, to get what one wants or to help someone else.	Miles	2023-08-10 00:00:01-07
691	Shit the bed	Shit the bed	To fail spectacularly or to a great degree.	Christina	2023-08-10 00:00:02-07
692	Another notch on your belt	\N	\N	Miles	2023-08-11 00:00:01-07
693	Shits and giggles	Shits and giggles	Fun or amusement derived without any serious purpose or motivation.	Miles	2023-08-11 00:00:02-07
694	Neck and neck	Neck and neck	Extremely close together; at or near an equal level. Usually said of competitors in a race or competition.	Miles	2023-08-11 00:00:03-07
695	Get this show on the road	Get this show on the road	To promptly begin or get something started.	Miles	2023-08-11 00:00:04-07
648	Make it rain	Make it rain	To throw or drop dollar bills in a show of wealth.	\N	2023-07-27 00:00:06-07
699	Put it past someone	\N	\N	Miles	2023-08-11 00:00:08-07
700	Trusting you as far as you can throw them	\N	\N	Miles	2023-08-11 00:00:09-07
701	Closed mouths don’t get fed	\N	\N	Eve	2023-08-11 00:00:10-07
703	Not my cup of tea	Cup of tea	Something one prefers, desires, enjoys, or cares about. Often used in the negative to mean the opposite.	Miles	2023-08-13 00:00:02-07
706	Pulling a rabbit out of a hat	Pull a rabbit out of a hat	To do something surprising and seemingly impossible; to produce something in a way that has no obvious explanation, as if done by magic. A reference to the magician’s trick of literally pulling a live rabbit out of a hat.	\N	2023-08-14 00:00:02-07
707	Scratched the surface	Scratch	\N	\N	2023-08-14 00:00:03-07
708	Rub off on someone	Rub off	To come off (of something else) after being rubbed.	\N	2023-08-14 00:00:04-07
716	Sight for sore eyes	A sight for sore eyes	Someone or something that one is excited or overjoyed to see, often after a long absence or separation.	Miles	2023-08-15 00:00:08-07
717	In the pit of your stomach	\N	\N	Christina	2023-08-15 00:00:09-07
718	Lump in your throat	Lump in (one’s) throat	An intense emotional reaction resulting in a sensation of tightness in the throat, as often precedes crying.	Miles	2023-08-15 00:00:10-07
719	Knock out of the park	Knock (something) out of the (ball)park	To do or perform something extraordinarily well; to produce or earn an exceptional achievement. An allusion to a baseball that is hit hard enough to land outside the stadium.	Miles	2023-08-15 00:00:11-07
720	On pins and needles	On pins and needles	Anxious and tense. (Likely an allusion to the tingling sensation that occurs when blood flow returns to a numb limb..	Christina	2023-08-15 00:00:12-07
721	Chicken with its head cut off	Like a chicken with its head cut off	With great haste and in a careless or senseless manner.	Miles	2023-08-15 00:00:13-07
722	Over the hill	Over the hill	Past the peak of one’s life or career; too old. Often hyphenated.	Miles	2023-08-15 00:00:14-07
723	Piece of cake	Piece of cake	A very easy task or accomplishment.	Christina	2023-08-15 00:00:15-07
724	Have a cow	Have a cow	To get very upset about something, often more than is expected or warranted.	Christina	2023-08-15 00:00:16-07
725	Bum rush	Bum rush	To attack or barge into a person or place forcefully or violently.	Miles	2023-08-15 00:00:17-07
726	To die for	To die for	Extremely attractive, enjoyable, or desirable.	Miles	2023-08-15 00:00:18-07
727	Blow your cover	Blow (one’s) cover	To expose one’s true identity or motives after they had been intentionally concealed (i.e. after one had been "undercover").	Miles	2023-08-15 00:00:19-07
728	Don’t judge a fish by its ability to climb a tree	\N	\N	Miles	2023-08-15 00:00:20-07
729	The devil is in the details	The devil is in the detail(s)	Plans, actions, or situations that seem sound must be carefully examined, because minor details can end up causing major, unforeseen problems.	Christina	2023-08-15 00:00:21-07
730	Cleanliness is next to godliness	Cleanliness is next to godliness	A phrase that strongly encourages and promotes neatness and personal hygiene.	Christina	2023-08-15 00:00:22-07
731	This town ain’t big enough for the two of us	\N	\N	Miles	2023-08-15 00:00:23-07
732	Time for a gun fight	\N	\N	Christina	2023-08-15 00:00:24-07
733	Pop you’re cherry	\N	\N	Christina	2023-08-15 00:00:25-07
734	Get your rocks off	Get (one’s) rocks off	\N	Miles	2023-08-15 00:00:26-07
735	Rock your socks off	\N	\N	Christina	2023-08-15 00:00:27-07
736	Cool your jets	Cool (one’s) jets	To calm oneself down; to become less agitated.	Miles	2023-08-15 00:00:28-07
737	Knee jerk reaction	Knee-jerk reaction	Any spontaneous, reflexive, and unthinking reaction or response.	\N	2023-08-16 00:00:01-07
738	Ruffle your feathers	Ruffle (one’s) feathers	To annoy, irritate, or upset someone.	\N	2023-08-16 00:00:02-07
739	Turn over a new leaf	Turn over a new leaf	To change one’s behavior, usually in a positive way.	Miles	2023-08-17 00:00:01-07
740	Rounding the bend	\N	\N	Miles	2023-08-18 00:00:01-07
741	Par for the course	Par for the course	Normal, typical, or to be expected (especially when something is a source of annoyance or frustration). An allusion to golf, in whic."par" is the number of strokes that it should take a player to get the ball into a particular hole on a golf course.	Miles	2023-08-18 00:00:02-07
742	Up in arms	Up in arms	Very upset or angry about something. Likened to an armed rebellion, from which the phrase originated.	Miles	2023-08-18 00:00:03-07
743	With guns blazing	With (one’s) guns blazing	Forcefully and with all of one’s energy and a strong sense of urgency or purpose, especially when directed at an argument or problem that has angered or frustrated one.	Miles	2023-08-18 00:00:04-07
744	Make heads or tails of it	\N	\N	Miles	2023-08-18 00:00:05-07
745	Tits up	Tits up	mildly vulgar Broken or malfunctioning; dead, falling apart, or ceasing to work.	Miles	2023-08-18 00:00:06-07
746	Sit on it	Sit on it	An exclamation of frustration directed at another person. Popularized by the TV sho.	Miles	2023-08-18 00:00:07-07
748	Get off on the wrong foot	Get off on the wrong foot	To have a bad start. Said of something that goes or has gone awry at the very beginning.	Miles	2023-08-18 00:00:09-07
749	Bright eyed and bushy tailed	Bright-eyed and bushy-tailed	Energetic and enthusiastic.	Ryan	2023-08-18 00:00:10-07
750	Squeezing the lemon	\N	\N	Ryan	2023-08-18 00:00:11-07
751	Bleeding the lizard	\N	\N	Miles	2023-08-18 00:00:12-07
752	Choking the chicken	Choke the chicken	To masturbate. A term only applied to males.	Ryan	2023-08-18 00:00:13-07
753	Beating the meat	Beat (one’s) meat	To masturbate. A term only applied to males.	Ryan	2023-08-18 00:00:14-07
754	Flicking the bean	\N	\N	Miles	2023-08-18 00:00:15-07
755	Soften the blow	Soften the blow	To make the impact of something negative less harmful.	Ryan	2023-08-18 00:00:16-07
756	Sitting pretty	Sit pretty	To be or remain in an ideal situation or advantageous position.	Ryan	2023-08-18 00:00:17-07
757	Tasted grapes	\N	\N	Ryan	2023-08-18 00:00:18-07
759	Walking on sunshine	Walk on sunshine	To be in a state of euphoria.	Miles	2023-08-18 00:00:20-07
986	Wind down/wind up	\N	\N	Christina	2023-09-09 00:00:01-07
1052	Licking someone’s boots	\N	\N	Miles	2023-10-27 00:00:05-07
774	Golden goose	Golden goose	A person, thing, or organization that is or has the potential to earn a lot of money for a long period of time. Taken from a folk tale of a goose that would lay a golden egg once a day, but which was killed by its owner because he wanted all of its gold at once.	Miles	2023-08-20 00:00:09-07
775	Beyond the pale	Beyond the pale	Completely unacceptable or inappropriate. A "pale" is an area bounded by a fence.	Eve	2023-08-20 00:00:10-07
776	Revenge is a dish best served cold	Revenge is a dish best served cold.	Revenge that takes place far in the future, after the offending party has forgotten how they wronged someone, is much more satisfying.	Miles	2023-08-21 00:00:01-07
777	Fall from grace	Fall from grace	To fall out of favor, typically due to having done something that tarnishes one’s reputation.	Eve	2023-08-22 00:00:01-07
779	Do the honors	Do the honors	To perform a task or duty of an official nature, often in a social setting. Sometimes used humorously.	Miles	2023-08-22 00:00:03-07
780	That tracks	\N	\N	Miles	2023-08-22 00:00:04-07
781	Pull the trigger	Pull the trigger (on something)	To make a final decision or commit to a certain course of action (about something).	Miles	2023-08-22 00:00:05-07
782	In the the chute	\N	\N	Miles	2023-08-22 00:00:06-07
783	Down the hatch	Down the hatch	Down one’s throat. This phrase is usually said before one drinks something (often something that has an especially foul or strong taste).	Miles	2023-08-22 00:00:07-07
784	Batten down the hatches	Batten down the hatches	To prepare for a challenging situation. While this originated as a nautical phrase, it is now used for any sort of imminent problem.	Eve	2023-08-22 00:00:08-07
785	To not give two shits	\N	\N	\N	2023-08-22 00:00:09-07
786	Dog and pony show	Dog and pony show	An elaborately organized event used mainly for promotion or to drive sales.	Eve	2023-08-22 00:00:10-07
787	Throw your hat in the ring	Throw (one’s) hat in(to) the ring	To announce that one is going to be competing with others, especially in a political election.	Eve	2023-08-22 00:00:11-07
788	My enemy’s enemy is my friend	My enemy’s enemy is my friend	A phrase highlighting how a common enemy can be a unifying force for otherwise disparate groups or people.	Miles	2023-08-22 00:00:12-07
789	Taking the high road	\N	\N	Miles	2023-08-22 00:00:13-07
790	Have a falling out	A falling out	A severe quarrel or disagreement, especially one that leads to a temporary or permanent end of a relationship.	Miles	2023-08-22 00:00:14-07
791	A broken record	\N	\N	MIles	2023-08-23 00:00:01-07
848	In a heartbeat	In a heartbeat	Very quickly; as soon as is possible.	Miles	2023-08-26 00:00:06-07
792	A bridge too far	A bridge too far	An act or plan whose ambition overreaches its capability, resulting in or potentially leading to difficulty or failure. Taken from the 1974 boo.	Miles	2023-08-23 00:00:02-07
793	Think outside the box	Think outside (of) the box	To think of something that is outside of or beyond what is considered usual, traditional, or conventional; to think innovatively.	Miles	2023-08-23 00:00:03-07
794	One fell swoop	One fell swoop	A single decisive or powerful action.	Miles	2023-08-23 00:00:04-07
795	Addressing the elephant in the room	\N	\N	Miles	2023-08-23 00:00:05-07
796	Opening up pandora’s box	\N	\N	Miles	2023-08-23 00:00:06-07
797	Pot of gold at the end of the rainbow	Pot of gold at the end of the rainbow	The ultimate goal, reward, achievement, etc., at the end of a difficult or arduous process.	Miles	2023-08-23 00:00:07-07
798	Live off the fat of the land	Live off the fat of the land	To live comfortably on a surplus of resources, without working very hard.	Miles	2023-08-23 00:00:08-07
799	Get a lay of the land	\N	\N	Miles	2023-08-23 00:00:09-07
800	Get the juices flowing	\N	\N	Miles	2023-08-24 00:00:01-07
801	Eye opening	Eye-opening	Causing or resulting in a shocking or startling revelation.	Miles	2023-08-24 00:00:02-07
802	Poking the bear	Poke the bear	To intentionally irritate or bother someone, especially when doing so carries an obvious risk.	Miles	2023-08-24 00:00:03-07
803	Spin a web of lies	Spin a web of lies	To create an intricate contrivance of misdirection, omission, or deception that ultimately serves to ensnare or entangle oneself or others.	Miles	2023-08-24 00:00:04-07
804	Coming out of your shell	Come out of (one’s) shell	To be or become less shy or reticent and more sociable, outgoing, or enthusiastic.	Christina	2023-08-24 00:00:05-07
806	Put some feelers out	\N	\N	Miles	2023-08-24 00:00:07-07
807	Barrel of monkeys	Barrel of monkeys	A group that is having fun and enjoying themselves. Often used in the phrase "more fun than a barrel of monkeys.".	Christina	2023-08-25 00:00:01-07
808	Monkey see monkey do	Monkey see, monkey do	Children naturally tend to imitate or copy what they see adults or other children doing.	Miles	2023-08-25 00:00:02-07
809	Getting your ass handed to you	\N	\N	Miles	2023-08-25 00:00:03-07
810	Come full circle	Come full circle	To return to the original or a similar position, situation, or circumstance where one or something started.	Miles	2023-08-25 00:00:04-07
811	High on the hog	High on the hog	Ostentatiously. The phrase refers to the rich being able to afford the choicest cut of meat, which, from a pig, is higher up on the animal.	Miles	2023-08-25 00:00:05-07
812	Taking the words out of someone’s mouth	\N	\N	Miles	2023-08-25 00:00:06-07
813	To be blown away	\N	\N	Miles	2023-08-25 00:00:07-07
814	Setting the bar low	Set the bar (high/low)	To establish an expected, required, or desired standard of quality. (Often said of a standard that is constrictive in being either too low or too high).	Miles	2023-08-25 00:00:08-07
815	Game changer	Game-changer	That which dramatically or fundamentally alters a situation or the way in which something is done or thought about.	Miles	2023-08-25 00:00:09-07
816	Keep your eyes peeled	Keep (one’s) eye(s) peeled (for someone or something)	To remain vigilant or carefully watchful (for something or someone).	Miles	2023-08-25 00:00:10-07
817	Hell hath no fury like a woman’s scorn	\N	\N	Miles	2023-08-25 00:00:11-07
818	Top notch	Top-notch	Stellar; excellent; the best. Can be used with or without a hyphen.	Miles	2023-08-25 00:00:12-07
819	Hit or miss	Hit or miss	Sometimes good or successful, sometimes not; having mixed or unpredictable results; random, aimless, careless, or haphazard. Often hyphenated.	Miles	2023-08-25 00:00:13-07
820	Shooting your shot	Shoot (one’s) shot	To take the risk of making one’s availability and interest known to others, as to a prospective employer or romantic partner.	Miles	2023-08-25 00:00:14-07
821	Hidden gem	Hidden gem	That which is of exceptional or underappreciated quality but is not especially popular or widely known.	Miles	2023-08-25 00:00:15-07
822	Too big for your britches	Too big for (one’s) boots	Overconfident in one’s importance, skill, or authority; behaving as if one is more important or influential than one actually is.	Miles	2023-08-25 00:00:16-07
1051	Picking something up	\N	\N	Miles	2023-10-27 00:00:04-07
825	Preaching to the choir	Preach to the choir	To try to convince someone about something that they already support; to state one’s opinion to those who are already most receptive to it.	Miles	2023-08-25 00:00:19-07
826	Had it up to here	\N	\N	Miles	2023-08-25 00:00:20-07
828	On a roll	On a roll	Experiencing a particularly successful period, without any setbacks or low points.	Miles	2023-08-25 00:00:22-07
829	Short fuse	A short fuse	A tendency to become angered, enraged, or upset very quickly or easily; a short temper.	Miles	2023-08-25 00:00:23-07
830	Hot headed	Hothead	A person with an excitable, fiery, or impetuous temper or disposition; one who is quick to get angry or act rashly.	Miles	2023-08-25 00:00:24-07
831	Having a ring to it	\N	\N	Miles	2023-08-25 00:00:25-07
832	Dropping the kids off at the pool	\N	\N	Miles	2023-08-25 00:00:26-07
833	Bun in the oven	A bun in the oven	An unborn child growing in one’s womb.	Miles	2023-08-25 00:00:27-07
834	Another face in the crowd	\N	\N	Miles	2023-08-25 00:00:28-07
835	A fine line	A fine line	A very narrow division between two deceptively similar things, one of which is worse than the other.	Christina	2023-08-25 00:00:29-07
836	Saving something for a rainy day	Save (something) for a rainy day	To reserve something, especially money, for use in a time or period of unforeseen difficulty, trouble, or need.	Christina	2023-08-25 00:00:30-07
952	Being in someone’s corner	\N	\N	Christina	2023-09-03 00:00:11-07
837	Shaking in your boots	Shake in (one’s) boots	To tremble with fear. Often used sarcastically.	Christina	2023-08-25 00:00:31-07
838	Water water all around and not a drop to drink	\N	\N	Eve	2023-08-25 00:00:32-07
839	Let your guard down	Let (one’s) guard down	To become less guarded or vigilant; to stop being cautious about potential trouble or danger.	Eve	2023-08-25 00:00:33-07
840	Hole in the wall	Hole in the wall	A small, inconspicuous place, often an establishment such a restaurant. The term sometimes but not always has a negative connotation implying a place that is perceived to be disreputable in some way.	Christina	2023-08-25 00:00:34-07
841	Pulling teeth	Pull teeth	To do something that is especially difficult, tedious, or requires an extreme amount of effort; to do something in the most difficult or unpleasant way possible.	Miles	2023-08-25 00:00:35-07
842	Take a load off	Take a load off (one’s feet)	To sit down and rest one’s feet; to relax. (Usually said as a suggestion..	Christina	2023-08-25 00:00:36-07
843	Shit end of the stick	\N	\N	Miles	2023-08-26 00:00:01-07
844	Tide me over	Tide (one) over	To maintain, sustain, or support one through a lean or difficult time until more of something is acquired, especially food or money.	Eve	2023-08-26 00:00:02-07
845	By the skin of your teeth	By the skin of (one’s) teeth	Barely. Often used to describe something that almost didn’t happen.	Miles	2023-08-26 00:00:03-07
849	Calm before the storm	Calm before the storm	A period of inactivity or tranquility before something chaotic begins. Likened to a literal period of calm before a storm begins.	Christina	2023-08-26 00:00:07-07
850	Take by storm	Take (someone, something, or some place) by storm	To conquer, seize, or lay siege to something, someone, or some place with a sudden and furious attack.	Christina	2023-08-27 00:00:01-07
851	Lift the veil	Lift the veil (on something)	To divulge, explain, or reveal something that was previously a secret.	Miles	2023-08-27 00:00:02-07
852	A feather in your cap	A feather in (one’s) cap	An accomplishment or achievement that one takes pride in.	Miles	2023-08-27 00:00:03-07
853	Clear cut	Clear-cut	\N	Miles	2023-08-27 00:00:04-07
854	Head over heals	\N	\N	Miles	2023-08-28 00:00:01-07
855	Going for broke	Go for broke	To give something one’s full effort.	Miles	2023-08-28 00:00:02-07
856	Steal the show	Steal the show	To become the main focus of attention or deliver the most captivating performance in the presence of one or more others, typically unexpectedly.	Miles	2023-08-28 00:00:03-07
857	In a nutshell	In a nutshell	In summary; concisely.	Miles	2023-08-28 00:00:04-07
858	Throw away the key	Lock (someone) up and throw away the key	To incarcerate someone in prison forever or indefinitely.	Miles	2023-08-28 00:00:05-07
860	Joined at the hip	Joined at the hip	Always near or spending a lot of time with someone else, often a close friend.	Miles	2023-08-28 00:00:07-07
861	Over your head	Over (one’s) head	Too complicated to be understood by one.	Miles	2023-08-28 00:00:08-07
862	In too deep	In too deep	Too involved in something to easily extract oneself or make reasonable decisions.	Christina	2023-08-28 00:00:09-07
863	Under the spotlight	Under the spotlight	The center of attention.	Christina	2023-08-28 00:00:10-07
864	Under a microscope	Under a microscope	Under close inspection or intense scrutiny.	Christina	2023-08-28 00:00:11-07
865	Tag team	Tag team	\N	Christina	2023-08-28 00:00:12-07
866	Break a leg	Break a leg	A phrase of encouragement typically said to one who is about to perform before an audience, especially a theater actor.	Christina	2023-08-28 00:00:13-07
867	Chips stacked against someone	\N	\N	Miles	2023-08-28 00:00:14-07
868	Different animal	\N	\N	Miles	2023-08-28 00:00:15-07
869	Apple of my eye	The apple of (one’s) eye	A cherished or favored person. This phrase is thought to be Biblical in origin.	Christina	2023-08-28 00:00:16-07
870	Lift the lid	\N	\N	Eve	2023-08-28 00:00:17-07
871	On the fly	On the fly	Quickly and informally, without thought or preparation.	Christina	2023-08-29 00:00:01-07
872	Out of touch	Out of touch	Not in contact or communicating any longer; not aware of the news or status of someone or something.	Christina	2023-08-29 00:00:02-07
873	Get your knickers in a twist	Get (one’s) knickers in a twist	To become overly upset or emotional over something, especially that which is trivial or unimportant.	Miles	2023-08-29 00:00:03-07
874	Stake your claim	Stake (one’s) claim	To assert one’s ownership of or right to something.	Miles	2023-08-29 00:00:04-07
875	Hold a candle	Hold a candle to (someone or something)	To compare to someone or something; to be as good or desirable as someone or something. Often used in the negative to mean the opposite.	Miles	2023-08-29 00:00:05-07
805	Shedding your skin	\N	\N	Miles	2023-08-24 00:00:06-07
876	Bought the farm	Bought the farm	Died.	Eve	2023-08-29 00:00:06-07
877	Cliff hanger	Cliffhanger	An ending of a piece of fiction (e.g., a television episode, chapter of a book, a film, etc.) characterized by a dramatically suspenseful and uncertain end.	Eve	2023-08-29 00:00:07-07
880	Parse out	Parse out	To make sense of or find meaning in something. A noun or pronoun can be used between "parse" and "out.".	Eve	2023-08-30 00:00:03-07
881	Pan out	Pan out	To conclude in a successful or pleasing manner; to work out.	Christina	2023-08-30 00:00:04-07
882	Back to brunch	\N	\N	Eve	2023-08-30 00:00:05-07
883	Down the drain	Down the drain	In a state of failure or ruination.	Miles	2023-08-30 00:00:06-07
884	Kiss of death	Kiss of death	An action, event, or association that causes inevitable ruin or failure. An allusion to Judas Iscariot’s betrayal of Jesus Christ, during which Judas kissed Jesus as a way of identifying him to those who would put him to death.	Eve	2023-08-30 00:00:07-07
885	Bees knees	Be the bee’s knees	To be exceptionally great, excellent, or high-quality.	Miles	2023-08-30 00:00:08-07
886	Fly off the handle	Fly off the handle	To become uncontrollably angry; to lose control of one’s temper.	Miles	2023-08-30 00:00:09-07
887	Let loose	Let (someone or something) loose	To make free or give up control of something or someone; to release or discharge something or someone, as from confinement.	Christina	2023-08-31 00:00:01-07
888	Come to grips	\N	\N	Christina	2023-08-31 00:00:02-07
889	From the ground up	From the ground up	From the first step through to completion; entirely.	Christina	2023-08-31 00:00:03-07
890	I’ll be a monkeys uncle	\N	\N	Miles	2023-08-31 00:00:04-07
891	Rally the troops	Rally the troops	To call others together to join with or lend support to someone or something. An allusion to reassembling dispersed soldiers ("troops"). Usually used as an imperative.	Christina	2023-08-31 00:00:05-07
892	Off the charts	Off the charts	Quite a lot more or better than is usual or was expected.	Christina	2023-08-31 00:00:06-07
893	Pain in the ass	Pain in the ass	An especially irritating, aggravating, or obnoxious person, thing, or situation. Primarily heard in US.	Christina	2023-08-31 00:00:07-07
894	Bases are covered	\N	\N	Miles	2023-08-31 00:00:08-07
895	Next level	Next-level	Especially good or advanced.	Christina	2023-08-31 00:00:09-07
896	Read the fine print	Read the fine print	To make oneself aware of the specific terms, conditions, restrictions, limitations, etc., of an agreement, contract, or other document, which are often printed in very small type and thus easy to miss.	Miles	2023-08-31 00:00:10-07
897	The jury is out	The jury is (still) out	A decision has not yet been made.	Miles	2023-08-31 00:00:11-07
898	Breaking the seal	\N	\N	Miles	2023-08-31 00:00:12-07
899	Going all in	\N	\N	\N	2023-08-31 00:00:13-07
900	Upping the ante	Up the ante	To raise the stakes in a betting game.	Miles	2023-08-31 00:00:14-07
937	Get a bee in your bonnet	\N	\N	Christina	2023-09-02 00:00:03-07
901	Tipping point	Tipping point	A critical or pivotal point in a situation or process at which some small or singular influence acts as a catalyst for a broader, more dramatic, or irreversible change.	Miles	2023-08-31 00:00:15-07
902	Ace in the hole	Ace in the hole	A major advantage that one keeps hidden until an ideal time. The phrase originated in poker, in which an ace is the most valuable card. Primarily heard in UK.	Christina	2023-08-31 00:00:16-07
903	Easter egg	Easter egg	\N	Miles	2023-08-31 00:00:17-07
904	At a crossroad	\N	\N	Miles	2023-08-31 00:00:18-07
959	Go out on a limb	Go out on a limb	To do or say something that lacks evidence or support.	\N	2023-09-04 00:00:02-07
905	Selling your soul to the devil	Sell (one’s) soul (to the devil)	To abandon one’s values or morals in return for some highly desired benefit, typically success, power, wealth, etc.	Christina	2023-08-31 00:00:19-07
906	Head to head	Head-to-head	Describing a one-on-one matchup or comparison.	Christina	2023-08-31 00:00:20-07
907	Hand to hand	Hand to hand	Involving or characterized by people in close proximity to one another. Hyphenated if used as a modifier before a noun.	Miles	2023-08-31 00:00:21-07
908	Blow it to kingdom come	Blow (someone or something) to kingdom come	\N	Miles	2023-08-31 00:00:22-07
909	Fountain of youth	Fountain of youth	Anything reputed or promising to restore one’s youth, vitality, or health, or at least the appearance thereof.	Miles	2023-08-31 00:00:23-07
910	Head in the clouds	Head in the clouds	Impractical, aloof, or fanciful to the point of being very unhelpful or counterproductive.	Christina	2023-08-31 00:00:24-07
911	Rein it in	\N	\N	\N	2023-08-31 00:00:25-07
912	To no avail	To no avail	Having or with very little benefit, efficacy, or effect.	Christina	2023-08-31 00:00:26-07
913	Wrap your mind around it	\N	\N	\N	2023-08-31 00:00:27-07
914	Fork in the road	Fork in the road	Literally, the point at which one road splits or separates off into other roads.	Christina	2023-08-31 00:00:28-07
915	Fill someone in	Fill in	\N	Miles	2023-08-31 00:00:29-07
916	Put it on the back burner	Put (something) on the back burner	To establish something as being a low priority; to give something less or little thought or attention; to postpone, suspend, or hold off on doing something.	Miles	2023-08-31 00:00:30-07
917	Trickle in	Trickle in	Of a liquid, to flow or seep in(to something) in drops or a thin stream.	\N	2023-08-31 00:00:31-07
918	Last man standing	The last man/woman/person standing	The final person who endures or emerges victorious from some situation, activity, or pursuit in which others are eliminated.	Christina	2023-08-31 00:00:32-07
919	Put a cork in it	Put a cork in it	To stop talking and be quiet. Usually used as an imperative.	Christina	2023-08-31 00:00:33-07
920	Bottled up	Bottle up	\N	Christina	2023-08-31 00:00:34-07
921	Man of the hour	(the) man/woman of the hour	A person currently being celebrated, honored, or admired by others, especially for a recent victory, accomplishment, or other cause for celebration.	Christina	2023-08-31 00:00:35-07
922	Start off on the right foot	Start off on the right foot	To have a positive or favorable start.	Christina	2023-08-31 00:00:36-07
923	End on a good note	\N	\N	Christina	2023-08-31 00:00:37-07
924	Scratching my head	\N	\N	Christina	2023-08-31 00:00:38-07
925	Mind’s eye	In (one’s) mind’s eye	In one’s imagination or mind, especially referring to something that is being visualized.	Christina	2023-09-01 00:00:01-07
926	Going to town	Go to town	To act with great energy and/or enthusiasm.	Christina	2023-09-01 00:00:02-07
927	Blow your load	Blow (one’s) load	To lose or spend all of one’s money.	Christina	2023-09-01 00:00:03-07
859	In hog heaven	In hog heaven	In a state of extreme happiness.	Miles	2023-08-28 00:00:06-07
928	Give it a shot	Give it a shot	To try something (often for the first time as a means of forming an opinion about it).	Christina	2023-09-01 00:00:04-07
929	Shake it off	Shake off	To rid or free oneself from someone or something that one finds aggravating, upsetting, or annoying.	Christina	2023-09-01 00:00:05-07
932	Leave you hanging	Leave (one) hanging	To withhold information from one when it is expected to be delivered.	Christina	2023-09-01 00:00:08-07
933	If wishes were horses then beggars would ride	If wishes were horses, (then) beggars would ride	One must work for the things one wants, not merely wish for them to come true; wishing for something won’t make it happen.	Eve	2023-09-01 00:00:09-07
934	Dead in the water	Dead in the water	Completely defunct.	Miles	2023-09-01 00:00:10-07
935	Shake your tail feathers	Shake (one’s) tail feather	To dance, especially by moving one’s buttocks along to the beat.	Christina	2023-09-02 00:00:01-07
936	Egg on your face	Egg on (one’s) face	The embarrassment that results from a failure or faux pas. Typically used in the phrase "have egg on (one’s) face.".	Christina	2023-09-02 00:00:02-07
938	Reaching the end of your rope	Reach the end of (one’s) rope	To be completely worn out, exasperated, or exhausted; to have no more patience, endurance, or energy left.	Christina	2023-09-02 00:00:04-07
939	Bring something to the table	Bring (something) to the table	To provide or offer a useful skill or attribute to a shared task, activity, or endeavor.	Miles	2023-09-02 00:00:05-07
940	Give someone lip	\N	\N	Christina	2023-09-02 00:00:06-07
941	Out of the blue	Out of the blue	Completely unexpectedly.	Miles	2023-09-02 00:00:07-07
942	Night and day	Night and day	All the time; continuously.	Miles	2023-09-03 00:00:01-07
943	If you build it they will come	\N	\N	Christina	2023-09-03 00:00:02-07
944	Ride it out	Ride out	To travel to or from a place on a vehicle or animal.	Christina	2023-09-03 00:00:03-07
945	Going to the end of the earth	\N	\N	Christina	2023-09-03 00:00:04-07
946	Blood on your hands	\N	\N	Miles	2023-09-03 00:00:05-07
947	Stick it to the man	Stick it to the man	To show resistance to or fight back against the established doctrines of a person or body of authority, especially the government.	Christina	2023-09-03 00:00:06-07
948	Pull the plug	Pull the plug (on someone or something)	Literally, to discontinue the power supply for a device by removing its power cable from the socket.	Miles	2023-09-03 00:00:07-07
949	Pushing someone’s buttons	Push (one’s) buttons	To do things that create a very strong emotional reaction in one, especially anger, irritation, or exasperation.	Miles	2023-09-03 00:00:08-07
950	Go wherever the wind takes you	\N	\N	\N	2023-09-03 00:00:09-07
951	Loose cannon	Loose cannon	Someone who has the propensity to act unpredictably or to lose their temper very quickly.	Miles	2023-09-03 00:00:10-07
953	Taking the piss	Take the piss (out of) (someone or something)	To tease, mock, or ridicule (someone or something); to joke or kid around (about someone or something). Primarily heard in UK, Ireland.	Christina	2023-09-03 00:00:12-07
954	To be on fire	\N	\N	Christina	2023-09-03 00:00:13-07
955	Clap back	Clap back	\N	Miles	2023-09-03 00:00:14-07
956	Sound the alarm	Sound the alarm	Literally, to activate an alarm.	Miles	2023-09-03 00:00:15-07
957	Count your blessings	Count (one’s) blessings	To reflect on the good things in one’s life and be grateful for them.	Miles	2023-09-03 00:00:16-07
958	Bag of tricks	Bag of tricks	The items that one has available for use. The phrase originally referred to the items a magician would use for magic tricks.	\N	2023-09-04 00:00:01-07
960	Glass ceiling	Glass ceiling	The systemic discrimination (likened to an invisible barrier) against certain groups in the workplace, especially women, that prevents them from advancing.	\N	2023-09-04 00:00:03-07
961	The powder trail is lit	\N	\N	\N	2023-09-04 00:00:04-07
962	Under the hood	Under the hood	The underlying implementation of a product (hardware, software, or idea).  Implies that the implementation is not intuitively obvious from the appearance, but the speaker is about to enable the listener t.	\N	2023-09-04 00:00:05-07
963	Chip away at something	\N	\N	\N	2023-09-04 00:00:06-07
964	Take a stab at something	A try (at something)	A chance or opportunity to do or attempt something.	Miles	2023-09-06 00:00:01-07
965	Plant the seed	Plant the seeds (of something)	To do something that ensures a certain outcome in the future, especially an unfortunate or tragic one.	Miles	2023-09-04 00:00:07-07
966	Hit the ground running	Hit the ground running	To begin something energetically and successfully.	Christina	2023-09-06 00:00:02-07
967	Bite the dust	Bite the dust	\N	Christina	2023-09-07 00:00:01-07
968	Pull it off	Pull off	\N	Christina	2023-09-07 00:00:02-07
969	Get under your skin	Get under (one’s) skin	To become a source of irritation.	Miles	2023-09-07 00:00:03-07
970	Across the board	Across the board	Applying to or impacting every part or individual in a group or spectrum of things.	Miles	2023-09-07 00:00:04-07
971	Take something and run with it	\N	\N	Miles	2023-09-07 00:00:05-07
972	Come to terms	Come to terms	To agree to or do something, especially a set of demands or conditions.	Miles	2023-09-07 00:00:06-07
973	Setting the stage	Set the stage for (something)	Literally, to prepare and decorate a stage for something, such as a performance.	Miles	2023-09-07 00:00:07-07
974	Put someone on blast	Put (one) on blast	To publicly attack, scold, shame, or mock one, typically on social media.	Miles	2023-09-07 00:00:08-07
975	In the ballpark	In the ballpark	Close to something specific, often a cost or amount.	Miles	2023-09-07 00:00:09-07
976	Lean into it	Lean into (someone or something)	To push into or press against someone or something.	Miles	2023-09-07 00:00:10-07
977	Change of heart	A change of heart	A change in one’s opinion or feelings on a matter.	Miles	2023-09-07 00:00:11-07
978	Weed out	Weed out	To remove one or multiple undesirable people or things from a group. A noun or pronoun can be used between "weed" and "out.".	Miles	2023-09-07 00:00:12-07
979	Thinning the herd	\N	\N	Miles	2023-09-07 00:00:13-07
980	Send someone for a loop	\N	\N	Miles	2023-09-07 00:00:14-07
981	Keep in touch	Keep in touch	To maintain contact with another person, especially at intervals so as to remain up to date with each other’s lives.	Miles	2023-09-07 00:00:15-07
982	On the same/different level	\N	\N	Miles	2023-09-07 00:00:16-07
983	Match made in heaven	A match made in heaven	An extremely well-suited pairing of people or things; a match that will result in a particularly positive or successful outcome.	Miles	2023-09-07 00:00:17-07
984	Bottom line	The bottom line	Literally, the final figure on a statement showing a person or company’s total profit or loss.	Christina	2023-09-07 00:00:18-07
987	Ramping up	Ramp up	To increase. A noun or pronoun can be used between "ramp" and "up.".	Christina	2023-09-09 00:00:02-07
988	To piggyback off of something	Piggyback off (of) (something)	To use something said or done by someone else as the foundation for one’s own actions.	Christina	2023-09-09 00:00:03-07
989	Thread the needle	Thread the needle	\N	Christina	2023-09-09 00:00:04-07
990	Chicken out	Chicken out	To refuse to do something due to fear (real or perceived).	Christina	2023-09-09 00:00:05-07
991	Lose your head	Lose (one’s) head	To lose one’s composure and act emotionally or irrationally.	Miles	2023-09-09 00:00:06-07
992	Run it up the flagpole	Run it up the flagpole (and see who salutes)	To test out an idea in order to gauge interest or gain feedback.	Christina	2023-09-09 00:00:07-07
993	Another nail in the coffin	Another nail in the coffin	Another negative event or action that contributes to one’s downfall or to something’s failure.	Miles	2023-09-09 00:00:08-07
994	Hit rock bottom	Hit rock bottom	The reach the lowest or worst point of a decline.	Miles	2023-09-09 00:00:09-07
995	Eagle eye	Eagle eye	Eeyesight, especially for something in particular.	Christina	2023-09-11 00:00:01-07
996	Out of left field	Out of left field	Uncommon, unpopular, or otherwise strange.	Christina	2023-09-11 00:00:02-07
997	Half cocked	Half-cocked	Prematurely, impulsively, or rashly.	Christina	2023-09-11 00:00:03-07
998	Heart to heart	Heart-to-heart	\N	Miles	2023-09-11 00:00:04-07
999	Sitting duck	Sitting duck	A person or thing that is vulnerable to or unprotected from attack; an easy target.	Christina	2023-09-12 00:00:01-07
1000	Sticking your neck out for someone	\N	\N	Christina	2023-09-12 00:00:02-07
1001	Clear the air	Clear the air	To remove or improve stale air or an unpleasant odor.	Christina	2023-09-12 00:00:03-07
1002	Put a sock in it	Put a sock in it	To stop talking. Often used as an imperative.	Christina	2023-09-12 00:00:04-07
1003	To put your finger on something	\N	\N	Miles	2023-09-12 00:00:05-07
1004	Have your finger on the pulse	Have (one’s) finger on the pulse	To be very aware of current trends and happenings in a particular place.	Miles	2023-09-12 00:00:06-07
1005	Buckle down	Buckle down	\N	Miles	2023-09-12 00:00:07-07
1006	Blow over	Blow over	\N	Christina	2023-09-18 00:00:01-07
1007	Work yourself into a lather	Work (oneself) into a lather	To become very nervous, distressed, or upset.	Christina	2023-09-18 00:00:02-07
1008	Ham it up	Ham it up	To act in an exaggerated way, typically in order to be funny.	Christina	2023-09-18 00:00:03-07
1009	Be my guest	Be my guest	Used to express encouragement or allowance for someone else to take action.	Christina	2023-09-18 00:00:04-07
1069	Thumb up your ass	\N	\N	Christina	2023-11-16 23:00:03-08
1010	Blow it out of the water	Blow (someone or something) out of the water	To totally defeat or ruin someone or something. The image refers to the explosion of a ship that has been hit by enemy fire.	Miles	2023-09-19 00:00:01-07
1011	To sink in	Sink in	To penetrate, absorb, or soak in (to something).	Miles	2023-09-20 00:00:01-07
1012	When something goes pear shaped	\N	\N	Miles	2023-09-20 00:00:02-07
1013	I’ll fall on that sword	\N	\N	Miles	2023-09-20 00:00:03-07
1014	Sleep with one eye open	Sleep with one eye open	To stay awake or sleep very lightly so as to remain very wary, cautious, or alert.	Miles	2023-09-20 00:00:04-07
1016	Fired up	(all) fired up	Feeling very excited or passionate about something.	\N	2023-09-22 00:00:02-07
1017	Bobs your uncle	\N	\N	Miles	2023-09-24 00:00:01-07
1018	Rub someone the wrong way	Rub (one) the wrong way	To irritate one due to someone’s or something’s presence, nature, or habitual behavior (as opposed to directly and intentionally). Primarily heard in US.	Miles	2023-09-24 00:00:02-07
1019	To yank someone’s chain	\N	\N	Christina	2023-09-24 00:00:03-07
1020	Something in the wind	Something in the wind	Something rumored, anticipated, or intuited to happen or take place.	Christina	2023-09-24 00:00:04-07
1021	Keep the train rolling	\N	\N	Christina	2023-09-24 00:00:05-07
1022	Get your head in the game	Get (one’s) head in the game	To focus on and put one’s best effort into the athletic match currently underway.	Miles	2023-09-28 00:00:01-07
1024	Back against the wall	Back to the wall	In a bad or high-pressure situation in which one’s choice or ability to act is limited.	Miles	2023-09-28 00:00:03-07
1025	Backed into a corner	Be backed into a corner	To be forced into a difficult or unpleasant situation that one cannot easily resolve or escape.	Miles	2023-09-28 00:00:04-07
1026	Smuggling plums	\N	\N	Ryan	2023-09-28 00:00:05-07
1027	Get to the bottom of some thing	\N	\N	Christina	2023-09-28 00:00:06-07
1028	Bottom of the totem pole	\N	\N	Christina	2023-09-28 00:00:07-07
1029	Buckle up	Buckle up	\N	Miles	2023-09-29 00:00:01-07
1030	Scratches that same itch	\N	\N	Miles	2023-09-29 00:00:02-07
1031	Flying off the shelf	\N	\N	Miles	2023-09-29 00:00:03-07
1032	Off to the races	Off to the races	Departing for something.	Miles	2023-09-29 00:00:04-07
1033	Grind my gears	Grind (someone’s) gears	To greatly or specifically irritate or annoy someone.	Christina	2023-10-06 00:00:01-07
1034	Locked and loaded	Locked and loaded	Loaded with ammunition and prepared to be fired.	Miles	2023-10-01 00:00:01-07
1035	Cut and dried	Cut and dried	Prearranged, unchangeable, and dull. When it appears before a noun, the phrase is usually hyphenated.	Miles	2023-10-01 00:00:02-07
1036	Slip through the cracks	Slip through the cracks	To go unnoticed or undealt with; to be unintentionally neglected or ignored, especially in a corporate, political, or social system.	Miles	2023-10-01 00:00:03-07
1037	Close a chapter	\N	\N	Christina	2023-10-10 00:00:01-07
1038	Knock out	Knock (oneself) out	Expend a lot of one’s energy or try very hard (doing something). The image is of working so hard as to become unconscious.	Christina	2023-10-10 00:00:02-07
1039	Take it on the chin	Take (something) on the chin	Literally, to receive an impact, especially a punch, on one’s chin.	Christina	2023-10-10 00:00:03-07
1040	Dig your own grave	Dig (one’s) own grave	To do something that has or will have negative consequences that are easily able to be foreseen.	Christina	2023-10-10 00:00:04-07
1048	Taking a nose dive	Take a nosedive	Of an aircraft, to go into a sudden and rapid descent toward the ground leading with the nose of the plane.	Miles	2023-10-27 00:00:02-07
1049	Rolls off the tongue	Roll off the tongue	To be very easy or enjoyable to say. Sometimes used sarcastically to imply the opposite.	Miles	2023-10-27 00:00:03-07
1053	Kissing someone’s ass	\N	\N	Miles	2023-10-27 00:00:06-07
1054	On deck	On deck	Literally, on the deck of a ship or boat.	Miles	2023-10-27 00:00:07-07
1055	Out of hand	Out of hand	In an unruly or unmanageable state or manner; out of control.	Miles	2023-10-27 00:00:08-07
1056	Roll up your sleeves	Roll up (one’s) sleeves	To do or get ready to do something difficult, intense, or demanding. Literally rolling up one’s sleeves is often done before performing some kind of work.	Christina	2023-10-31 00:00:01-07
1057	Piss on a page	\N	\N	Christina	2023-10-31 00:00:02-07
1058	Licking your wounds	Lick (one’s) wounds	To withdraw after a misstep or defeat in order to recover.	Christina	2023-10-31 00:00:03-07
1059	In a pinch	In a pinch	When something ideal or preferred is not available; as a substitute.	Miles	2023-10-31 00:00:04-07
1060	To put someone on the spot	\N	\N	Christina	2023-11-06 23:00:01-08
1061	As the twig is bent so grows the tree	\N	\N	Miles	2023-11-06 23:00:02-08
1062	Middle of the road	Middle-of-the-road	Describing an option that is neither the most nor the least expensive.	Miles	2023-11-10 23:00:01-08
1063	Stick up your ass	Stick up (one’s) ass	A rigid and uptight demeanor.	Miles	2023-11-10 23:00:02-08
1064	Up in the air	Be up in the air	To be uncertain or subject to change.	Christina	2023-11-15 23:00:01-08
1065	Spit on your grave	\N	\N	Christina	2023-11-15 23:00:02-08
1066	Dont piss into the wind	\N	\N	Miles	2023-11-15 23:00:03-08
1067	Go to bat	Go to bat for (one)	To act in support of one.	Christina	2023-11-16 23:00:01-08
1068	Cooking something up	Cook up	\N	Christina	2023-11-16 23:00:02-08
1070	Shit dont stink	\N	\N	Christina	2023-11-16 23:00:04-08
1071	Cherry picking	Cherry-pick	To choose something very carefully to ensure that the best option is chosen, perhaps through means that provide one an unfair advantage or from a selection that others do not have ready access to.	Christina	2023-11-16 23:00:05-08
1072	Hot to trot	Hot to trot	Eager or impatient to do something.	Christina	2023-11-16 23:00:06-08
1074	Cutting your teeth on something	Cut (one’s) teeth on (something)	To gain experience with something, especially at a young age (when one’s teeth would be coming in).	Matt	2023-12-09 23:00:01-08
1075	Dont go chasing waterfalls	\N	\N	Christina	2023-12-09 23:00:02-08
1076	Twisting in the wind	\N	\N	Miles	2024-01-07 23:00:01-08
1077	Put the pussy on the chain wax	\N	\N	Miles	2024-01-07 23:00:02-08
1078	If frogs had glass asses they would would only hop once	\N	\N	Miles	2024-01-07 23:00:03-08
1079	The cock of the walk	\N	\N	Christina	2024-01-15 23:00:01-08
1080	Not on my watch	\N	\N	Christina	2024-01-15 23:00:02-08
769	Off the rails	Be off the rails	To be in a state of chaos, dysfunction, or disorder.	Miles	2023-08-20 00:00:04-07
705	Off the bat	Off the bat	In a trajectory caused by being hit by a bat.	\N	2023-08-14 00:00:01-07
3	Don’t hold your breath	Don’t hold your breath	Don’t expect something to happen. (The idea being that one couldn’t hold one’s breath long enough for the unlikely thing to happen.)	\N	2023-07-13 00:00:03-07
10	Let the cat out of the bag	Let the cat out of the bag	To reveal a secret.	\N	2023-07-13 00:00:10-07
1073	A wake up call	\N	\N	Miles	2023-11-16 23:00:07-08
666	Rule the roost	Rule the roost	To be the real boss; to be the person in charge.	\N	2023-08-08 00:00:08-07
667	Leave the table while you still have an appetite	\N	\N	\N	2023-08-08 00:00:09-07
1023	Being on the ball	\N	\N	Miles	2023-09-28 00:00:02-07
128	Missed the forest for the trees	can’t see the forest for the trees	Cannot see, understand, or focus on a situation in its entirety due to being preoccupied with minor details.	Eve	2023-07-14 00:00:01-07
129	When in Rome, do as the Romans do	When in rome (do as the romans do)	One should do what is customary or typical in a particular place or setting, especially when one is a tourist.	Miles	2023-07-14 00:00:02-07
130	6 in one hand half dozen in the other	six in one, (and) half a dozen in the other	The difference between these two options is negligible, irrelevant, or unimportant; either option is fine or will work as well as the other.	Eve	2023-07-14 00:00:03-07
131	6 ways to Sunday	6 wasy to Sunday	Thoroughly or completely; in every possible way; from every conceivable angle.	Eve	2023-07-14 00:00:04-07
134	A wolf in sheep’s clothing	A wolf in sheep’s clothing	A person or thing that appears harmless but is actually dangerous or bad.	Miles	2023-07-14 00:00:07-07
135	Does a bear shit in the woods	\N	A rhetorical question meaning the answer to the previous question is emphatically and obviously "yes.".	Miles	2023-07-14 00:00:08-07
136	Raining cats and dogs	It’s raining cats and dogs	It is raining extremely heavily.	Eve	2023-07-14 00:00:09-07
758	Cloud 9	Cloud nine	\N	Ryan	2023-08-18 00:00:19-07
167	Not in the cards	\N	\N	\N	2023-07-14 00:40:00-07
772	To live in someone’s shadow	\N	\N	Eve	2023-08-20 00:00:07-07
241	Let it slide	Let (something or someone) slide	To choose not to take any action to correct or improve a particular situation or someone’s actions or behavior.	Miles	2023-07-15 00:00:00-07
221	Well runs dry	\N	\N	\N	2023-07-14 01:34:00-07
242	Pass the buck	Pass the buck	To shift or reassign the blame or responsibility (for something) to another person, group, or thing.	Miles	2023-07-15 00:00:01-07
243	X marks the spot	X marks the spot	This sign or mark (not necessarily an X) indicates the specific or exact location (of something).	Miles	2023-07-15 00:00:02-07
244	15 minutes of fame	15 minutes of fame	A brief period of celebrity or notoriety. The term was coined by artist Andy Warhol.	Miles	2023-07-15 00:00:03-07
245	Hit the spot	Hit the spot	To satisfy something, such as hunger or a craving.	Miles	2023-07-15 00:00:04-07
246	Made in the shade	Made in the shade	In a comfortable position in life, usually due to some manner of financial success or windfall.	Eve	2023-07-15 00:00:05-07
247	Run for your money	Run for (one’s) money	A prolonged period of success.	Miles	2023-07-15 00:00:06-07
249	Out to lunch	Out to (some meal)	Away from one’s normal location to eat a particular meal.	Eve	2023-07-15 00:00:08-07
250	Circling the drain	Circle the drain	To be in a state of severe deterioration such that one is approaching inevitable ruin, failure, or death. Usually used in the continuous form.	Eve	2023-07-15 00:00:09-07
251	That’s the ticket	That’s the ticket	That is exactly the thing that is or was needed or called for.	\N	2023-07-15 00:00:10-07
252	Sloppy seconds	\N	\N	Miles	2023-07-15 00:00:11-07
253	Back in the fold	\N	\N	Eve	2023-07-15 00:00:12-07
254	Take someone under your wing	Take (someone) under (one’s) wing	To act as someone’s guardian, protector, or mentor, especially someone who is vulnerable or in need of help, protection, or instruction.	Eve	2023-07-15 00:00:13-07
255	We’re not in kansas anymore	Be not in kansas anymore	To no longer be in a place that one knows or where one is comfortable; to be in a completely unfamiliar and/or discomfiting environment. A reference t.	Eve	2023-07-15 00:00:14-07
256	Out of the woods	Out of the wood(s)	No longer in danger or dealing with a particular difficulty, though not entirely resolved. Usually used in the negative.	Eve	2023-07-15 00:00:15-07
257	Balls of steel	\N	\N	Eve	2023-07-15 00:00:16-07
258	Eyes too big for your stomach	\N	\N	\N	2023-07-15 00:00:17-07
259	Doe eyed	\N	\N	Eve	2023-07-15 00:00:18-07
260	Snug as a bug in a rug	Snug as a bug (in a rug)	Very warm and cozy, typically while wrapped in blankets.	Miles	2023-07-15 00:00:19-07
261	The cat that ate the canary	The cat that ate the canary	Someone who is smugly pleased or self-satisfied.	Eve	2023-07-15 00:00:20-07
262	Tongue twister	Tongue twister	A word or phrase that is hard to say clearly due to difficult alliteration or pronunciation.	Eve	2023-07-15 00:00:21-07
263	Roll of the dice	Roll of the dice	An especially risky action undertaken to achieve a favorable but unlikely outcome.	Eve	2023-07-15 00:00:22-07
264	He’s lost his marbles	\N	\N	\N	2023-07-15 00:00:23-07
266	Dead of night	Dead of night	The middle of the night.	Eve	2023-07-15 00:00:25-07
301	Comparison is the thief of joy	\N	\N	Eve	2023-07-16 00:00:01-07
302	Robbing the cradle	Rob the cradle	To date someone who is much younger than oneself.	Miles	2023-07-16 00:00:02-07
303	Going the way of the buffalo	\N	\N	Miles	2023-07-16 00:00:03-07
713	The whole enchilada	The whole enchilada	Every part of a multifaceted thing or situation taken together as a whole; the whole thing.	Christina	2023-08-15 00:00:05-07
304	Shell of your former self	A shell of (someone’s or something’s) former self	A person, group, place, etc., that has become dramatically less healthy, vivacious, or robust, often following some traumatic event or negative circumstances.	Eve	2023-07-16 00:00:04-07
305	The call is coming from inside the house	\N	\N	Eve	2023-07-16 00:00:05-07
306	Coming out swinging	Come out swinging	To compete or defend someone or something passionately or aggressively.	Eve	2023-07-16 00:00:06-07
307	Rose colored glasses	Rose-colored glasses	An unduly idealistic, optimistic, sentimental, or wistful perspective on or about something. Primarily heard in US.	Eve	2023-07-16 00:00:07-07
308	Fog of war	The fog of war	Confusion, uncertainty, or skewed judgment caused by the violence and chaos of warfare, especially in relation to one’s own capability compared to that of one’s enemy.	Miles	2023-07-16 00:00:08-07
309	The whole 9 yards	\N	\N	\N	2023-07-16 00:00:09-07
1	Not my circus, not my monkeys	Not my circus, not my monkeys	This troublesome, burdensome, or volatile situation is none of my concern, and thus I refuse to get involved in it. A loan translation of the Polish idio.	Eve	2023-07-13 00:00:01-07
2	Waiting with baited breath	Wait with bated breath	To remain in a state of eager anticipation (of or for something).	Eve	2023-07-13 00:00:02-07
4	People in glass houses shouldn’t throw stones	People (who live) in glass houses shouldn’t throw stones.	People who are vulnerable to criticism should not criticize others, especially not for the faults that they themselves have (since such criticism will likely be returned).	\N	2023-07-13 00:00:04-07
5	Don’t look a gift horse in the mouth	Don’t look a gift horse in the mouth	If you receive a gift, do so graciously, without voicing criticisms. The saying is attributed to St. Jerome and refers to the practice of looking at a horse’s teeth to determine its age.	\N	2023-07-13 00:00:05-07
6	Don’t count your chickens before they hatch	Don’t count your chickens before they hatch.	Don’t make plans based on future events, outcomes, or successes that might not come to pass.	\N	2023-07-13 00:00:06-07
7	Don’t keep all your eggs in one basket	put all (one’s) eggs in one basket	To invest, devote, or commit all of one’s energy or resources into a single venture, opportunity, or goal, generally at the risk of losing everything in the event that that thing fails or does not come to fruition.	\N	2023-07-13 00:00:07-07
8	A bird in the hand is worth two in the bush	A bird in the hand is worth two in the bush	It is better to have something less valuable than to pursue something more valuable that may not be able to be obtained.	\N	2023-07-13 00:00:08-07
9	There’s more than one way to skin a cat	There’s more than one way to skin a cat	There are many methods one may employ in achieving one’s ends.	Miles	2023-07-13 00:00:09-07
11	Open a can of worms	Open (up) a can of worms	To initiate, instigate, or reveal a situation that is or is likely to become very complicated or problematic or that will have a negative outcome.	\N	2023-07-13 00:00:11-07
12	Bull in a china shop	A bull in a china shop	Someone who is aggressively reckless and clumsy in a situation that requires delicacy and care.	Miles	2023-07-13 00:00:12-07
13	One trick pony	A one-trick pony	A person, group, or thing that is known for or limited to only one unique or noteworthy skill, talent, ability, quality, area of success, etc.	\N	2023-07-13 00:00:13-07
714	The whole kit and caboodle	The (whole) kit and caboodle	All the parts of a group of things.	Miles	2023-08-15 00:00:06-07
310	Turning over in your grave	(someone) is/would be turning over in their grave	The thing in question is offensive to the memory of someone; someone would be filled with shame, disgust, or disapproval if they were alive today.	Eve	2023-07-16 00:00:10-07
311	Shooting fish in a barrel	Like shooting fish in a barrel	Of some task or activity, exceptionally easy to do or accomplish.	Miles	2023-07-16 00:00:11-07
312	Light a fire under your ass	\N	\N	Mike	2023-07-16 00:00:12-07
313	An old flame	An/(one’s) old flame	One’s former lover.	Mike	2023-07-16 00:00:13-07
314	Up in smoke	Up in smoke	Destroyed by fire.	Mike	2023-07-16 00:00:14-07
315	Fighting fire with fire	Fight fire with fire	To retaliate with the same methods that one has had to endure.	Miles	2023-07-16 00:00:15-07
316	Firing in all cylinders	\N	\N	Mike	2023-07-16 00:00:16-07
317	The lion’s share	The lion’s share	The largest part or portion of something.	\N	2023-07-16 00:00:17-07
318	Pedal to the metal	Pedal to the metal	Drive as fast as you can; push the accelerator down.	\N	2023-07-16 00:00:18-07
319	Throw in the towel	Throw in the towel	To give up on some endeavor; to quit or abandon something; to admit defeat or failure.	\N	2023-07-16 00:00:19-07
486	The nearer the bone the sweeter the meat	The nearer the bone, the sweeter the meat	The last parts of something are the most enjoyable.	Eve	2023-07-19 00:00:06-07
300	Carrot on a stick	Carrot on a stick	A reward that is promised to someone as an incentive to complete some task.	Miles	2023-07-16 00:00:00-07
773	To never measure up	\N	\N	Eve	2023-08-20 00:00:08-07
370	Paint with broad strokes	\N	\N	\N	2023-07-16 00:01:10-07
416	Fly by the seat of your pants	Fly by the seat of (one’s) pants	To rely on one’s instinct, as opposed to acting according to a set plan.	Eve	2023-07-17 00:00:01-07
132	Burning bridges	Burn (one’s) bridges	\N	Miles	2023-07-14 00:00:05-07
326	Throw up a white flag	\N	\N	\N	2023-07-16 00:00:26-07
423	The clay is dry	\N	\N	\N	2023-07-17 00:00:08-07
1015	Get back in the saddle	\N	\N	Christina	2023-09-22 00:00:01-07
420	Kick the bucket	\N	\N	\N	2023-07-17 00:00:05-07
417	Play stupid games win stupid prizes	Play stupid games, win stupid prizes	If you engage in behavior that is stupid, obnoxious, or reckless, you will suffer unpleasant consequences.	Eve	2023-07-17 00:00:02-07
418	On the nose	On the nose	Precisely accurate; exactly right.	\N	2023-07-17 00:00:03-07
419	Hit the nail on the head	Hit the nail (right) on the head	Literally, to strike a nail on its head (the flat, circular end).	\N	2023-07-17 00:00:04-07
485	Jack of all trades	Jack of all trades	A person who is skilled in many different areas.	\N	2023-07-19 00:00:05-07
823	Get a big head	Get a big head	To become arrogant or conceited; to assume an exaggeratedly high opinion of oneself.	Miles	2023-08-25 00:00:17-07
470	A whole other ball game	\N	\N	Mike	2023-07-18 00:00:00-07
487	To worry is to make payments on a debt that may never come due	\N	\N	Eve	2023-07-19 00:00:07-07
824	Getting on your soap box	\N	\N	Miles	2023-08-25 00:00:18-07
473	Letting your true colors shine	\N	\N	\N	2023-07-18 00:00:03-07
481	Opiate of the masses	The opiate of the masses	That which creates a feeling of false happiness, contentment, or numbness to reality. Adapted from Karl Marx’s description of organized religion.	Eve	2023-07-19 00:00:01-07
482	The faster they rise the harder they fall	\N	\N	Eve	2023-07-19 00:00:02-07
483	Out of sight out of mind	Out of sight, out of mind	That which cannot be seen or is not noticeable will be forgotten.	\N	2023-07-19 00:00:03-07
484	Wearing multiple hats	\N	\N	\N	2023-07-19 00:00:04-07
488	A rolling stone gathers no moss	A rolling stone gathers no moss	A person who wanders or travels often and at length will not be burdened by attachments such as friends, family, or possessions. Can be used as a negative (to suggest that such a person won’t find a fulfilling place in life) or as a positive (to suggest that they will have a more interesting and unpredictable life).	Eve	2023-07-19 00:00:08-07
489	Necessity is the mother of invention	Necessity is the mother of invention	Creative solutions are often produced in response to difficulties or hardships that need to be overcome.	Eve	2023-07-19 00:00:09-07
490	A day late and a dollar short	A day late and a dollar short	Too late to be of any benefit.	Eve	2023-07-19 00:00:10-07
491	Sixpence none the richer	History	\N	Eve	2023-07-19 00:00:11-07
494	For whom the bell tolls	Background	Ernest Hemingway wrot.	Eve	2023-07-19 00:00:14-07
878	Out of the loop	Out of the loop	Not privy to the most up-to-date information.	Christina	2023-08-30 00:00:01-07
536	Herding cats	Be like herding cats	To be very unwieldy or unmanageable; to be nearly impossible to organize. Usually said of a group of people.	Eve	2023-07-20 00:00:00-07
524	Slap my ass and call me Sally	\N	\N	Eve	2023-07-19 00:00:44-07
879	Snap out of it	Snap out of (something)	To suddenly recover or be freed from some negative or undesirable condition, emotion, or situation.	Christina	2023-08-30 00:00:02-07
659	Served on a silver platter	\N	\N	Miles	2023-08-08 00:00:01-07
660	Fed from a silver spoon	\N	\N	Miles	2023-08-08 00:00:02-07
661	The road paved in gold	\N	\N	\N	2023-08-08 00:00:03-07
662	Pillow talk	Pillow talk	Intimate conversations between two people in a romantic relationship when they are in bed together.	\N	2023-08-08 00:00:04-07
663	Get the ball rolling	Get the ball rolling	To set something, often a process, in motion; to begin.	\N	2023-08-08 00:00:05-07
664	Long walk off a short pier	\N	\N	\N	2023-08-08 00:00:06-07
665	Bent out of shape	Bent out of shape	Of a person, upset or angry.	\N	2023-08-08 00:00:07-07
688	Cut me to the quick	Cut (one) to the quick	To slice a part of the body very deeply.	Christina	2023-08-09 00:00:16-07
684	Time to hang up your hat	\N	\N	\N	2023-08-09 00:00:12-07
709	Off the deep end	Off the deep end	Crazy or irrational.	Christina	2023-08-15 00:00:01-07
710	Toe to toe	Toe-to-toe	A direct conflict between two people or groups, possibly in close quarters.	Christina	2023-08-15 00:00:02-07
711	By a hair	By a hair	By an extremely short or slim margin (of distance, time, or another measure).	Miles	2023-08-15 00:00:03-07
712	Chip in	Chip in	To contribute to something being undertaken by a group, such as a task or collection.	Christina	2023-08-15 00:00:04-07
715	Flavor of the month	Flavor of the month	Someone or something very popular but only temporarily or ephemerally. The phrase is often used to describe fleeting romantic relationships.	Miles	2023-08-15 00:00:07-07
931	Take something off your plate	\N	\N	Christina	2023-09-01 00:00:07-07
760	Putting in leg work	\N	\N	Christina	2023-08-19 00:00:01-07
761	In the limelight	In the limelight	At the center of attention. The phrase refers to a type of lamp that was previously used in theatrical stage lighting.	Christina	2023-08-19 00:00:02-07
762	15 minutes of fame	15 minutes of fame	A brief period of celebrity or notoriety. The term was coined by artist Andy Warhol.	Christina	2023-08-19 00:00:03-07
763	Hit the bricks	Hit the bricks	To depart, often on foot.	Christina	2023-08-19 00:00:04-07
770	Living under a rock	Live under a rock	To be oblivious to or ignorant of something that is very widely known, often related to pop culture.	Eve	2023-08-20 00:00:05-07
771	True measure of a man	\N	\N	Eve	2023-08-20 00:00:06-07
778	This day in age	\N	\N	Miles	2023-08-22 00:00:02-07
827	Turn an burn	\N	\N	Miles	2023-08-25 00:00:21-07
985	Hand in glove	Hand in glove	In close association or collaboration (with someone or something).	Christina	2023-09-07 00:00:19-07
118	The grass is always greener on the other side of the fence	The grass is always greener (on the other side)	Other people’s circumstances or belongings always seem more desirable than one’s own.	\N	2023-07-13 00:01:58-07
119	Birds of a feather flock together	Birds of a feather flock together	People who have similar interests, ideas, or characteristics tend to seek out or associate with one another.	\N	2023-07-13 00:01:59-07
120	What’s good for the goose is good for the gander	what’s good for the goose is good for the gander	Used to say that one person or situation should be treated the same way that another person or situation is treated	Eve	2023-07-13 00:02:00-07
155	Screwed the pooch	Screw the pooch	To make a very serious, grievous, or irreversible mistake; to ruin something or cause something to fail due to such an error.	Eve	2023-07-14 00:28:00-07
194	Chasing the dragon	Chase the dragon	To smoke a controlled substance, often heroin.	\N	2023-07-14 01:07:00-07
248	Chopped liver	Chopped liver	A trivial, unimportant, or unappealing person or thing. The phrase likely originated as a part of Jewish humor, referring to the serving of chopped liver as a common side dish (thus overlooked in favor of the main course), the taste of which many do not find appealing.	Miles	2023-07-15 00:00:07-07
555	Light in the loafers	\N	Homosexual, especially of men.	\N	2023-07-20 00:00:19-07
614	Shit or get off the pot	Shit or get off the pot	Either commit to doing something productive or step aside and stop wasting time.	\N	2023-07-24 00:00:09-07
1041	Put it all on the line	Put it all on the line	To put forth one’s maximum amount of energy or effort; to make use of all of one’s resources or abilities.	Christina	2023-10-10 00:00:05-07
1042	Over the top	Over the top	Beyond a certain limit, threshold, goal, or quota.	Miles	2023-10-14 00:00:01-07
1043	Touch base	Touch base (with someone)	To contact someone to update them or receive an update from them.	Miles	2023-10-14 00:00:02-07
1044	Within an inch of life	Within an inch of (one’s) life	Very soundly or thoroughly, to or as if to the point of near death.	Christina	2023-10-18 00:00:01-07
1045	Picking your brain	Pick (one’s) brain(s)	To ask one questions in order to obtain detailed information or advice.	Christina	2023-10-18 00:00:02-07
1046	A slap in the face	Slap in the face	Words or actions that have offended or otherwise upset someone.	Christina	2023-10-18 00:00:03-07
1047	A slap on the wrist	Slap on the wrist	A mild punishment or warning.	Miles	2023-10-27 00:00:01-07
1050	To have someone’s back	\N	\N	Miles	2023-10-27 00:00:03-07
\.


--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 211
-- Name: idioms_examples_test_example_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.idioms_examples_test_example_id_seq', 1, false);


--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 213
-- Name: idioms_origin_test_origin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.idioms_origin_test_origin_id_seq', 1, false);


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 209
-- Name: idioms_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.idioms_test_id_seq', 1081, true);


--
-- TOC entry 3447 (class 2606 OID 147512)
-- Name: idioms_examples_test idioms_examples_test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_examples_test
    ADD CONSTRAINT idioms_examples_test_pkey PRIMARY KEY (example_id);


--
-- TOC entry 3449 (class 2606 OID 147530)
-- Name: idioms_origin_test idioms_origin_test_idiom_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_idiom_id_key UNIQUE (idiom_id);


--
-- TOC entry 3451 (class 2606 OID 147528)
-- Name: idioms_origin_test idioms_origin_test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_pkey PRIMARY KEY (origin_id);


--
-- TOC entry 3445 (class 2606 OID 147484)
-- Name: idioms_test idioms_test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_test
    ADD CONSTRAINT idioms_test_pkey PRIMARY KEY (id);


--
-- TOC entry 3452 (class 2606 OID 147513)
-- Name: idioms_examples_test idioms_examples_test_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_examples_test
    ADD CONSTRAINT idioms_examples_test_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms_test(id);


--
-- TOC entry 3453 (class 2606 OID 147531)
-- Name: idioms_origin_test idioms_origin_test_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idioms_origin_test
    ADD CONSTRAINT idioms_origin_test_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms_test(id);


-- Completed on 2024-10-06 19:50:54 PDT

--
-- PostgreSQL database dump complete
--

