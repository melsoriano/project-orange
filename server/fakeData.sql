
INSERT INTO users (id, "username", "password", "firstName", "lastName", "birthDate", "location", "occupation", "gender", "token", "createdAt", "updatedAt") VALUES (DEFAULT, 'test', 'test', 'User', 'One', '1990-01-01', 'Honolulu', 'Unemployed', 'male', null, '2017-10-20', '2017-10-20');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'I wrote to Fraulein Pruckl to-day. She is staying at Achensee. I should like to see her. Every afternoon we bathe and then go for a walk. But to-day it has been raining all day. Such a bore. I forgot to bring my paint-box and Im not allowed to read all day. Mother says, if you gobble all your books up now youll have nothing left to read. Thats quite true, but I cant even go and swing. Afternoon. I must write some more. Ive had a frightful row with Dora. She says Ive been fiddling with her things. Its all because shes so untidy. As if her things could interest me. Yesterday she left her letter to Erika lying about on the table, and all I read was: Hes as handsome as a Greek god. I dont know who he was for she came in at that moment. Its probably Krail Rudi, with whom she is everlastingly playing tennis and carries on like anything. As for handsome well, theres no accounting
for tastes.', '-0.263358', 'negative', '0.529377', '0.692635', '0.071169', '0.071169', '0.098985', 'text', null, '2017-10-20', '2017-10-20', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'frightful row', '-0.75983', 'negative', '0.221473', '0.152579', '0.079617', '0.189716', '0.288176', '0.189716', '2017-10-20', '2017-10-20', '1', '1'),
(DEFAULT, 'afternoon', '0.434329', 'positive', '0.704668', '0.161887', '0.509559', '0.158226', '0.020973', '0.143576', '2017-10-20', '2017-10-20', '1', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'Its a good thing I brought my dolls portmanteau. Mother said: Youll be glad to have it on rainy days. Of course Im much too old to play with dolls, but even though Im 11 I can make dolls clothes still. One learns something while one is doing it, and when Ive finished something I do enjoy it so. Mother cut me out some things and I was tacking them together. Then Dora came into the room and said Hullo, the child is sewing things for her dolls. What cheek, as if she had never played with dolls. Besides, I dont really play with dolls any longer. When she sat down beside me I sewed so vigorously that I made a great scratch on her hand, and said: Oh, Im so sorry, but you came too close. I hope she will know why I really did it. Of course she will go and sneak to Mother. Let her. What right has she to call me child. Shes got a fine red scratch anyhow, and on her right hand where everyone can see."
', '0.00045234', 'positive', '0.187207', '0.638713', '0.119869', '0.098523', '0.1294', 'text', null, '2017-10-21', '2017-10-21', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'dolls', '-0.00193563', 'negative', '0.983039', '0.17376', '0.650993', '0.174864', '0.122326', '0.126931', '2017-10-21', '2017-10-21', '2', '1'),
(DEFAULT, 'Mother', '-0.0790992', 'negative', '0.610928', '0.270637', '0.345494', '0.044283', '0.128018', '0.383373', '2017-10-20', '2017-10-20', '1', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'I simply could not write yesterday.
The Warths have arrived, and I had to spend the
whole day with Erna and Liesel, although it rained
all day. We had a ripping time. They know a lot
of round games and we played for sweets. I won
47, and I gave five of them to Dora. Robert is already
more than a head taller than we are, I mean than
Liesel and me; I think he is fifteen. He says Fraulein
Grete and carried my cloak which Mother sent me because
of the rain and he saw me home after supper."
', '-0.20862', 'negative', '0.260755', '0.619718', '0.132659', '0.054442', '0.13215', 'text', null, '2017-10-22', '2017-10-22', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'ripping time', '0.656095', 'postive', '0.85573', '0.360191', '0.418825', '0.064464', '0.042906', '0.087813', '2017-10-22', '2017-10-22', '3', '1'),
(DEFAULT, 'Liesel', '-0.43133', 'negative', '0.742631', '0.425036', '0.287613', '0.106364', '0.084918', '0.150007', '2017-10-22', '2017-10-22', '3', '1');

-
INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'Yesterday was heavenly. We laughed
till our sides ached over Consequences. I was always
being coupled with Robert and oh the things we did
together, not really of course but only in writing:
kissed, hugged, lost in the forest, bathed together;
but I say, I wouldnt do that quarrelled. That
wont happen, its quite impossible! Then we drank
my health clinking glasses five times and Robert
wanted to drink it in wine but Dora said that would
never do! The real trouble was this. She always
gets furious if she has to play second fiddle to me
and yesterday I was certainly first fiddle."
', '0.589333', 'positve', '0.22803', '0.61958', '0.172135', '0.067879', '0.097621', 'text', null, '2017-10-23', '2017-10-23', '1');

-- KEYWORDS FOR ENTRY #4
INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'fiddle', '0.43695', 'postive', '0.658538', '0.629877', '0.14447', '0.015303', '0.095411', '0.239065', '2017-10-23', '2017-10-23', '4', '1'),
(DEFAULT, 'Liesel', '-0.43133', 'negative', '0.742631', '0.425036', '0.287613', '0.106364', '0.084918', '0.150007', '2017-10-23', '2017-10-23', '4', '1');

-- ENTRY #5
INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'Yesterday was heavenly. We laughed
till our sides ached over Consequences. I was always
being coupled with Robert and oh the things we did
together, not really of course but only in writing:
kissed, hugged, lost in the forest, bathed together;
but I say, I wouldnt do that quarrelled. That
wont happen, its quite impossible! Then we drank
my health clinking glasses five times and Robert
wanted to drink it in wine but Dora said that would
never do! The real trouble was this. She always
gets furious if she has to play second fiddle to me
and yesterday I was certainly first fiddle."
', '0.589333', 'positve', '0.22803', '0.61958', '0.172135', '0.067879', '0.097621', 'text', null, '2017-10-24', '2017-10-24', '1');

-- KEYWORDS FOR ENTRY #5
INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'fiddle', '0.53695', 'postive', '0.658538', '0.629877', '0.14447', '0.015303', '0.095411', '0.239065', '2017-10-24', '2017-10-24', '5', '1'),
(DEFAULT, 'Robert', '0.881915', 'positive', '0.627797', '0.076328', '0.753931', '0.059079', '0.028921', '0.052565', '2017-10-24', '2017-10-24', '5', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'We go to the tennis ground every
day. When we set off yesterday, Robert and I and
Liesel and Erna and Rene, Dora called after us:
The bridal pair in spee. She had picked up the
phrase from Oswald. I think it means in a hundred
years. _She_ can wait a hundred years if she likes, we
shant. Mother scolded her like anything and said
she mustnt say such stupid things. A good job too;
in spee, in spee. Now we always talk of her as Inspee,
but no one knows who we mean."
', '0.0205661', 'positve', '0.244218', '0.633691', '0.099446', '0.102874', '0.4816', 'text', null, '2017-10-25', '2017-10-25', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'bridal pair', '0', null, '0.856868', '0.156096', '0.117075', '0.129753', '0.144478', '0.249884', '2017-10-25', '2017-10-25', '6', '1'),
(DEFAULT, 'stupid things', '-0.788888', 'negative', '0.774639', '0.314699', '0.055174', '0.122422', '0.193469', '0.585459', '2017-10-25', '2017-10-25', '6', '1'),
(DEFAULT, 'Erna', '0.410317', null, '0.418842', '0.110332', '0.127586', '0.089634', '0.080304', '0.07927', '2017-10-25', '2017-10-25', '6', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'There has been such a fearful row
about Dora. Oswald told Father that she flirted
so at the tennis court and he could not stand it.
Father was in a towering rage and now we maynt
play tennis any more. What upset her more than
anything was that Father said in front of me: This
little chit of 14 is already encouraging people to make love to her. Her eyes were quite red and swollen
and she couldnt eat anything at supper because she
had such a headache!! We know all about her headaches.
But I really cant see why I shouldnt go and
play tennis.', '-0.771502', 'negative', '0.525624', '0.111389', '0.580187', '0.097128', '0.682173', 'text', null, '2017-10-26', '2017-10-26', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'fearful row', '-0.83088', 'negative', '0.856868', '0.097752', '0.072678', '0.645446', '0.128489', '0.125389', '2017-10-26', '2017-10-26', '7', '1'),
(DEFAULT, 'towering rage', '-0.621054', 'negative', '0.858597', '0.062761', '0.076415', '0.016168', '0.037885', '0.848094', '2017-10-26', '2017-10-26', '7', '1'),
(DEFAULT, 'little chit', '0.433426', null, '0.791542', '0.190956', '0.653798', '0.018581', '0.10027', '0.07113', '2017-10-26', '2017-10-26', '7', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'I couldnt sleep all night for I kept on dreaming of the society, wondering whether there are such
societies in the high school and whether Dora is in
a society and has a name tattooed on her. But it
would be horrible to have to strip naked before all
ones schoolfellows. Perhaps in the societies of the
high-school girls that part is left out. But I shouldnt like to say for sure whether Id have Roberts name tattooed on me.', '-0.771502', 'negative', '0.483038', '0.059502', '0.252155', '0.336639', '0.180175', 'text', null, '2017-10-27', '2017-10-27', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'high-school girls', '-0.725519', 'negative', '0.950767', '0.451296', '0.158665', '0.128129', '0.318293', '0.116383', '2017-10-27', '2017-10-27', '8', '1'),
(DEFAULT, 'societies', '-0.725519', 'negative', '0.830571', '0.237308', '0.316318', '0.187099', '0.2272', '0.092465', '2017-10-27', '2017-10-27', '8', '1'),
(DEFAULT, 'Dora', '0', null, '0.616639', '0.097975', '0.363114', '0.175147', '0.121478', '0.065246', '2017-10-27', '2017-10-27', '8', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'By the way, in the raffle I won a vase with 2 turtledoves and a bag of sweets and R. won a knife, fork and spoon. That annoyed him frightfully. Inspee won a fountain pen, just what I want, and a mirror which makes one look a perfect fright. A good job too, for she fancies herself such a lot.', '0.512841', 'positive', '0.014517', '0.884599', '0.037298', '0.004705', '0.075807', 'text', null, '2017-10-28', '2017-10-28', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'perfect fright', '0.560686', 'postive', '0.997749', '0.090359', '0.644999', '0.031121', '0.014246', '0.009503', '2017-10-28', '2017-10-28', '9', '1'),
(DEFAULT, 'vase', '0.374378', null, '0.691478', '0.008055', '0.886219', '0.05173', '0.008537', '0.058048', '2017-10-28', '2017-10-28', '9', '1'),
(DEFAULT, 'raffle', '0.374378', null, '0.663687', '0.008055', '0.886219', '0.05173', '0.008537', '0.058048', '2017-10-28', '2017-10-28', '9', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'O dear, such an awful thing has
happened. I have lost pages 30 to 34 from my diary.
I must have left them in the garden, or else on the
Louisenhohe. Its positively fiendish. If anyone was
to find them. And I dont know exactly what there
was on those pages. I was born to ill luck. If I
hadnt promised Hella to write my diary every day
I should like to give up the whole thing. Fancy if
Mother were to get hold of it, or even Father. And
its raining so fearfully to-day that I cant even go
into the garden and still less on the Louisenhohe above all not alone. I must have lost it the day before yesterday, for I didnt write anything yesterday or the day before. It would be dreadful if anyone were to find it. I am so much upset that I couldnt eat anything at dinner, although we had my favourite chocolate cream cake. And Im so unhappy for Father was quite anxious and Mother too and they both
asked what was the matter with me and I nearly
burst out crying before everyone. We had dinner in
the hotel to-day because Resi had gone away for 2
days. But I couldnt cry in the room before Father
and Mother for that would have given the show away.
My only hope is that no one will recognise my writing,
for Hella and I use upright writing for our diary,
first of all so that no one may recognise our writing
and secondly because upright writing doesnt use up
so much paper as ordinary writing. I do hope it
will be fine to-morrow so that I can hunt in the garden very early. I have been utterly in the dumps all day so that I didnt even get cross when Inspee said: "Have you been quarrelling with your future husband?"', '-0.567439', 'negative', '0.014517', '0.884599', '0.037298', '0.004705', '0.075807', 'text', null, '2017-10-29', '2017-10-29', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'chocolate cream cake', '0.399118', 'postive', '0.916803', '0.060038', '0.75328', '0.004037', '0.014066', '0.171371', '2017-10-200', '2017-10-28', '10', '1'),
(DEFAULT, 'upright writing', '-0.403511', null, '0.691478', '0.008055', '0.886219', '0.05173', '0.008537', '0.058048', '2017-10-200', '2017-10-200', '10', '1'),
(DEFAULT, 'raffle', '0.374378', null, '0.663687', '0.008055', '0.886219', '0.05173', '0.008537', '0.058048', '2017-10-200', '2017-10-28', '10', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'Thank goodness! In front of the shelter
I found 2 pages all pulped by the rain and the writing all run and one page was in the footpath quite torn. Someone must have trodden on it with the heel of his boot and 2 pages had been rolled into a spill and partly burned. So no one had read anything. I am so happy. And at supper Father said: I say, why are your eyes shining with delight? Have you won the big prize in the lottery? and I pressed Mothers foot with mine to remind her not to give me away and Father laughed like anything and said: Seems to me theres a conspiracy against me in my own house. And I said in a great hurry: Luckily were
not in our own house but in a hotel, and everyone laughed and now thank goodness its all over. Live and learn. I wont let that happen again.', '0.00394623', 'positive', '0.504409', '0.696512', '0.117228', '0.060034', '0.084035', 'text', null, '2017-10-30', '2017-10-30', '1');


INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'perfect fright', '0.560686', 'postive', '0.997749', '0.090359', '0.644999', '0.031121', '0.014246', '0.009503', '2017-10-201', '2017-10-201', '11', '1'),
(DEFAULT, 'big prize', '0.383779', null, '0.842627', '0.049482', '0.775206', '0.078204', '0.056426', '0.048025', '2017-10-30', '2017-10-30', '11', '1'),
(DEFAULT, 'goodness', '0.734234', null, '0.738691', '0.010773', '0.819951', '0.01014', '0.005347', '0.113922', '2017-10-30', '2017-10-30', '11', '1'),
(DEFAULT, 'pages', '-0.766273', null, '0.493314', '0.676436', '0.028474', '0.227386', '0.094631', '0.249441', '2017-10-30', '2017-10-30', '11', '1');


INSERT INTO entries (id, "text", "sentimentScore", "sentimentLabel", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "type", "source_id", "createdAt", "updatedAt", "user_id") VALUES (DEFAULT, 'Thank goodness! In front of the shelter
I found 2 pages all pulped by the rain and the writing all run and one page was in the footpath quite torn. Someone must have trodden on it with the heel of his boot and 2 pages had been rolled into a spill and partly burned. So no one had read anything. I am so happy. And at supper Father said: I say, why are your eyes shining with delight? Have you won the big prize in the lottery? and I pressed Mothers foot with mine to remind her not to give me away and Father laughed like anything and said: Seems to me theres a conspiracy against me in my own house. And I said in a great hurry: Luckily were
not in our own house but in a hotel, and everyone laughed and now thank goodness its all over. Live and learn. I wont let that happen again.', '0.00394623', 'positive', '0.504409', '0.696512', '0.117228', '0.060034', '0.084035', 'text', null, '2017-10-31', '2017-10-31', '1');

INSERT INTO keywords (id, "keyword", "sentimentScore", "sentimentLabel", "relevanceScore", "sadnessScore", "fearScore", "angerScore", "joyScore", "disgustScore", "createdAt", "updatedAt", "entry_id", "user_id") VALUES (DEFAULT, 'perfect fright', '0.560686', 'postive', '0.997749', '0.090359', '0.644999', '0.031121', '0.014246', '0.009503', '2017-10-31', '2017-10-31', '12', '1'),
(DEFAULT, 'big prize', '0.383779', null, '0.842627', '0.049482', '0.775206', '0.078204', '0.056426', '0.048025', '2017-10-31', '2017-10-31', '12', '1'),
(DEFAULT, 'goodness', '0.734234', null, '0.738691', '0.010773', '0.819951', '0.01014', '0.005347', '0.113922', '2017-10-31', '2017-10-31', '12', '1'),
(DEFAULT, 'pages', '-0.766273', null, '0.493314', '0.676436', '0.028474', '0.227386', '0.094631', '0.249441', '2017-10-31', '2017-10-31', '12', '1');