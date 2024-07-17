--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

-- Started on 2024-07-13 22:22:01 CDT

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

--
-- TOC entry 6 (class 2615 OID 148540)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: mason
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO mason;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 148542)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: mason
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO mason;

--
-- TOC entry 210 (class 1259 OID 148541)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: mason
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO mason;

--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 210
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: mason
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 215 (class 1259 OID 148560)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    inventory_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.cart_items OWNER TO mason;

--
-- TOC entry 214 (class 1259 OID 148559)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO mason;

--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 214
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 213 (class 1259 OID 148551)
-- Name: carts; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.carts OWNER TO mason;

--
-- TOC entry 212 (class 1259 OID 148550)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO mason;

--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 212
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 217 (class 1259 OID 148569)
-- Name: categories; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.categories OWNER TO mason;

--
-- TOC entry 216 (class 1259 OID 148568)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO mason;

--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 219 (class 1259 OID 148578)
-- Name: images; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    inventory_id integer,
    category_id integer
);


ALTER TABLE public.images OWNER TO mason;

--
-- TOC entry 218 (class 1259 OID 148577)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO mason;

--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 218
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 221 (class 1259 OID 148587)
-- Name: inventory; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    stock integer NOT NULL,
    unit_price text NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.inventory OWNER TO mason;

--
-- TOC entry 220 (class 1259 OID 148586)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_id_seq OWNER TO mason;

--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 220
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- TOC entry 225 (class 1259 OID 148605)
-- Name: order_items; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    inventory_id integer NOT NULL,
    price text NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.order_items OWNER TO mason;

--
-- TOC entry 224 (class 1259 OID 148604)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO mason;

--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 224
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 223 (class 1259 OID 148596)
-- Name: orders; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    subtotal text NOT NULL,
    discount text NOT NULL,
    tax text NOT NULL,
    status text NOT NULL,
    order_date text NOT NULL
);


ALTER TABLE public.orders OWNER TO mason;

--
-- TOC entry 222 (class 1259 OID 148595)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO mason;

--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 222
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 227 (class 1259 OID 148616)
-- Name: reviews; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    inventory_id integer,
    rating integer NOT NULL,
    comment character varying(240) NOT NULL,
    review_date text NOT NULL
);


ALTER TABLE public.reviews OWNER TO mason;

--
-- TOC entry 226 (class 1259 OID 148615)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO mason;

--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 226
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 229 (class 1259 OID 148627)
-- Name: users; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(100) NOT NULL,
    username character varying(30) NOT NULL,
    password text NOT NULL,
    email character varying(150) NOT NULL,
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO mason;

--
-- TOC entry 228 (class 1259 OID 148626)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO mason;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 233 (class 1259 OID 148646)
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.wishlist_items (
    id integer NOT NULL,
    wishlist_id integer NOT NULL,
    inventory_id integer NOT NULL
);


ALTER TABLE public.wishlist_items OWNER TO mason;

--
-- TOC entry 232 (class 1259 OID 148645)
-- Name: wishlist_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.wishlist_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wishlist_items_id_seq OWNER TO mason;

--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 232
-- Name: wishlist_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.wishlist_items_id_seq OWNED BY public.wishlist_items.id;


--
-- TOC entry 231 (class 1259 OID 148639)
-- Name: wishlists; Type: TABLE; Schema: public; Owner: mason
--

CREATE TABLE public.wishlists (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.wishlists OWNER TO mason;

--
-- TOC entry 230 (class 1259 OID 148638)
-- Name: wishlists_id_seq; Type: SEQUENCE; Schema: public; Owner: mason
--

CREATE SEQUENCE public.wishlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wishlists_id_seq OWNER TO mason;

--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 230
-- Name: wishlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mason
--

ALTER SEQUENCE public.wishlists_id_seq OWNED BY public.wishlists.id;


--
-- TOC entry 3225 (class 2604 OID 148545)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: mason
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 148563)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 148554)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 148572)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 148581)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 148590)
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 148608)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 148599)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 148619)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 148630)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 148649)
-- Name: wishlist_items id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlist_items ALTER COLUMN id SET DEFAULT nextval('public.wishlist_items_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 148642)
-- Name: wishlists id; Type: DEFAULT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlists ALTER COLUMN id SET DEFAULT nextval('public.wishlists_id_seq'::regclass);


--
-- TOC entry 3428 (class 0 OID 148542)
-- Dependencies: 211
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: mason
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	1959c2b55903e0758e9ce2e4ffa92c889643701c32294e6e36bf46a0c8531313	1717436924709
\.


--
-- TOC entry 3432 (class 0 OID 148560)
-- Dependencies: 215
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.cart_items (id, cart_id, inventory_id, quantity) FROM stdin;
\.


--
-- TOC entry 3430 (class 0 OID 148551)
-- Dependencies: 213
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.carts (id, user_id) FROM stdin;
21	28
\.


--
-- TOC entry 3434 (class 0 OID 148569)
-- Dependencies: 217
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.categories (id, name, description) FROM stdin;
1	Shirts	Welcome to our Shirts Collection, where style meets comfort and versatility. Whether you're dressing up for a formal event, gearing up for a casual outing, or seeking the perfect office wear, our extensive range of shirts has something for everyone. Explore a variety of styles, fabrics, and fits to find your ideal match.
2	Shorts	Welcome to our Shorts Collection, where style meets comfort and practicality. Whether you're preparing for a summer adventure, relaxing at home, or seeking the perfect activewear, our extensive range of shorts has something for everyone. Explore a variety of styles, fabrics, and fits to find your perfect pair for any occasion.
3	Pants	Welcome to our Pants Collection, where sophistication meets comfort and practicality. Whether you're dressing up for a special occasion, relaxing on the weekend, or looking for the perfect office attire, our wide selection of pants has something to suit every need. Discover an array of styles, materials, and fits to find the perfect pair for any event.
4	Jeans	Welcome to our Jeans Collection, where classic style meets modern comfort. Whether you're heading out for a casual day, enjoying a night out, or simply looking for everyday wear, our diverse range of jeans has something for everyone. Explore various cuts, washes, and fits to find your perfect pair. From timeless blue denim to trendy distressed styles, our jeans are designed to provide the perfect blend of durability and fashion.
5	Underwear	Welcome to our Underwear Collection, where comfort and style converge seamlessly. Whether you're seeking daily essentials, preparing for a special event, or looking for the ideal blend of support and fashion, our extensive selection of men's underwear has you covered. Discover a variety of designs, fabrics, and fits to find the perfect pair for any occasion.
6	Watches	Welcome to our Watches Collection, where elegance meets functionality. Whether you're looking for a sophisticated timepiece for formal occasions, a sporty watch for active adventures, or a versatile everyday accessory, our extensive range of watches has something to suit every style and need. Explore a variety of designs, materials, and features to find the perfect watch that complements your personality and lifestyle. From classic analog designs to modern smartwatches, our collection offers the perfect blend of precision and fashion.
7	Hats	Welcome to our Hats Collection, where style meets versatility and functionality. Whether you're looking to make a fashion statement, stay protected from the sun, or keep warm in cooler weather, our wide range of hats has something for every occasion. Explore various styles, from classic fedoras and chic berets to casual caps and cozy beanies, to find the perfect accessory that complements your look. Our hats are designed to provide both comfort and flair, making them an essential addition to any wardrobe.
8	Accessories	Welcome to our Accessories Collection, where the perfect finishing touches await. Whether you're looking to elevate your style with chic sunglasses, add a touch of elegance with stunning earrings, or make a statement with bold necklaces, our diverse range of accessories has something for every taste and occasion. Explore a variety of designs, materials, and trends to find the ideal pieces that reflect your unique personality. From timeless classics to contemporary favorites, our accessories are designed to complement and enhance any outfit.
\.


--
-- TOC entry 3436 (class 0 OID 148578)
-- Dependencies: 219
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.images (id, image, description, inventory_id, category_id) FROM stdin;
1	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716852537/savetheBeestshirt_r2zplq.png	Shirt Category Picture	\N	1
2	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716854088/beeShortsNOBG_ucqdue.png	Shorts Category Picture	\N	2
3	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716854375/beePantsNOBG_ceoxmo.png	Pants Category Picture	\N	3
4	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716853593/beeJeans_pagktk.png	Jeans Category Picture	\N	4
5	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716850498/newbeeUnderwear_kwh1zd.png	Underwear Category Picture	\N	5
6	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716854548/beeWatchNOBG_zcovsv.png	Watches Category Picture	\N	6
7	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716854701/beeHatNOBG_nguxuk.png	Hats Category Picture	\N	7
8	https://res.cloudinary.com/dabfhr2dr/image/upload/v1716854857/beeSunglassesNOBG.png_iwfyr4.png	Accessories Category Picture	\N	8
9	https://res.cloudinary.com/dabfhr2dr/image/upload/v1720220164/bye-beeShirtNOBG_ro3ftv.png	Bye-Bee T-Shirt	1	\N
\.


--
-- TOC entry 3438 (class 0 OID 148587)
-- Dependencies: 221
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.inventory (id, name, description, stock, unit_price, category_id) FROM stdin;
1	Bye-Bee Tshirt	Add a touch of whimsy to your wardrobe with our Bybee Bear T-Shirt, a perfect blend of fun and comfort. This unique t-shirt features an adorable bear waving goodbye to a bee, a playful nod to the name 'Bybee'. Crafted from 100% cotton, it’s as soft and breathable as it is charming.	100	14.32	1
\.


--
-- TOC entry 3442 (class 0 OID 148605)
-- Dependencies: 225
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.order_items (id, order_id, inventory_id, price, quantity) FROM stdin;
2	2	1	14.32	2
\.


--
-- TOC entry 3440 (class 0 OID 148596)
-- Dependencies: 223
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.orders (id, user_id, subtotal, discount, tax, status, order_date) FROM stdin;
2	28	41.15	0	2.51	ordered	13-07-2024
\.


--
-- TOC entry 3444 (class 0 OID 148616)
-- Dependencies: 227
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.reviews (id, user_id, inventory_id, rating, comment, review_date) FROM stdin;
\.


--
-- TOC entry 3446 (class 0 OID 148627)
-- Dependencies: 229
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.users (id, first_name, last_name, username, password, email, admin) FROM stdin;
28	Mason	Bybee	Kranked	$2b$12$1H6exhXEo/MGdu9peoFRhu.1alBuwoQP9qNZOjbzuwgWTc2gvPXua	bybeemason@gmail.com	f
\.


--
-- TOC entry 3450 (class 0 OID 148646)
-- Dependencies: 233
-- Data for Name: wishlist_items; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.wishlist_items (id, wishlist_id, inventory_id) FROM stdin;
\.


--
-- TOC entry 3448 (class 0 OID 148639)
-- Dependencies: 231
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: mason
--

COPY public.wishlists (id, user_id) FROM stdin;
21	28
\.


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 210
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: mason
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, true);


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 214
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 10, true);


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 212
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.carts_id_seq', 21, true);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 218
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.images_id_seq', 9, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 220
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.inventory_id_seq', 1, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 224
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.order_items_id_seq', 2, true);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 222
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.orders_id_seq', 2, true);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 226
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 232
-- Name: wishlist_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.wishlist_items_id_seq', 18, true);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 230
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mason
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 21, true);


--
-- TOC entry 3239 (class 2606 OID 148549)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: mason
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 148567)
-- Name: cart_items cart_items_cart_id_inventory_id_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_inventory_id_unique UNIQUE (cart_id, inventory_id);


--
-- TOC entry 3247 (class 2606 OID 148565)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 148556)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 148558)
-- Name: carts carts_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_unique UNIQUE (user_id);


--
-- TOC entry 3249 (class 2606 OID 148576)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 148585)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 3253 (class 2606 OID 148594)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 3257 (class 2606 OID 148614)
-- Name: order_items order_items_order_id_inventory_id_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_inventory_id_unique UNIQUE (order_id, inventory_id);


--
-- TOC entry 3259 (class 2606 OID 148612)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 148603)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 148623)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3263 (class 2606 OID 148625)
-- Name: reviews reviews_user_id_inventory_id_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_inventory_id_unique UNIQUE (user_id, inventory_id);


--
-- TOC entry 3265 (class 2606 OID 148635)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 148637)
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- TOC entry 3271 (class 2606 OID 148651)
-- Name: wishlist_items wishlist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 148653)
-- Name: wishlist_items wishlist_items_wishlist_id_inventory_id_unique; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_wishlist_id_inventory_id_unique UNIQUE (wishlist_id, inventory_id);


--
-- TOC entry 3269 (class 2606 OID 148644)
-- Name: wishlists wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_pkey PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 148659)
-- Name: cart_items cart_items_cart_id_carts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_carts_id_fk FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- TOC entry 3276 (class 2606 OID 148664)
-- Name: cart_items cart_items_inventory_id_inventory_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_inventory_id_inventory_id_fk FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


--
-- TOC entry 3274 (class 2606 OID 148654)
-- Name: carts carts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3278 (class 2606 OID 148674)
-- Name: images images_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3277 (class 2606 OID 148669)
-- Name: images images_inventory_id_inventory_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_inventory_id_inventory_id_fk FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


--
-- TOC entry 3279 (class 2606 OID 148679)
-- Name: inventory inventory_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3282 (class 2606 OID 148694)
-- Name: order_items order_items_inventory_id_inventory_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_inventory_id_inventory_id_fk FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


--
-- TOC entry 3281 (class 2606 OID 148689)
-- Name: order_items order_items_order_id_orders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_orders_id_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- TOC entry 3280 (class 2606 OID 148684)
-- Name: orders orders_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3284 (class 2606 OID 148704)
-- Name: reviews reviews_inventory_id_inventory_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_inventory_id_inventory_id_fk FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


--
-- TOC entry 3283 (class 2606 OID 148699)
-- Name: reviews reviews_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3287 (class 2606 OID 148719)
-- Name: wishlist_items wishlist_items_inventory_id_inventory_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_inventory_id_inventory_id_fk FOREIGN KEY (inventory_id) REFERENCES public.inventory(id);


--
-- TOC entry 3286 (class 2606 OID 148714)
-- Name: wishlist_items wishlist_items_wishlist_id_wishlists_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_wishlist_id_wishlists_id_fk FOREIGN KEY (wishlist_id) REFERENCES public.wishlists(id);


--
-- TOC entry 3285 (class 2606 OID 148709)
-- Name: wishlists wishlists_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: mason
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-07-13 22:22:04 CDT

--
-- PostgreSQL database dump complete
--

