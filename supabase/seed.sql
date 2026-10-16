-- NEXO PATRIMONIO - SEED BASELINE (Hapi al 30/09/2026)

-- 1. Catálogo de activos
insert into public.assets (symbol, name, asset_type, currency) values
('AMZN', 'Amazon', 'stock', 'USD'),
('GOOGL', 'Alphabet', 'stock', 'USD'),
('CVSA', 'Covista', 'stock', 'USD'),
('CIFR', 'Cipher Digital', 'stock', 'USD'),
('META', 'Meta Platforms', 'stock', 'USD'),
('IVV', 'iShares Core S&P 500 ETF', 'etf', 'USD'),
('IEMG', 'iShares Core Emerging Markets ETF', 'etf', 'USD'),
('IAU', 'iShares Gold Trust', 'etf', 'USD'),
('IREN', 'IREN', 'stock', 'USD'),
('LPTH', 'LightPath Technologies', 'stock', 'USD'),
('MSTR', 'Strategy', 'stock', 'USD'),
('NVDA', 'Nvidia', 'stock', 'USD'),
('NU', 'Nu Holdings', 'stock', 'USD'),
('ORCL', 'Oracle', 'stock', 'USD'),
('RBLX', 'Roblox', 'stock', 'USD'),
('RKLB', 'Rocket Lab', 'stock', 'USD'),
('SSYS', 'Stratasys', 'stock', 'USD'),
('TTWO', 'Take-Two Interactive', 'stock', 'USD'),
('VGT', 'Vanguard Information Technology ETF', 'etf', 'USD'),
('V', 'Visa', 'stock', 'USD'),
('SMH', 'VanEck Semiconductor ETF', 'etf', 'USD'),
('NBIS', 'Nebius', 'stock', 'USD'),
('ZETA', 'Zeta Global', 'stock', 'USD'),
('EOSE', 'Eos Energy', 'stock', 'USD'),
('ONDS', 'Ondas', 'stock', 'USD')
on conflict (symbol) do nothing;

-- 2. Tasa de cambio base
insert into public.fx_rates (base_currency, quote_currency, rate, effective_date, source_type) values
('USD', 'COP', 4200.0000, '2026-10-16', 'official_trm')
on conflict (base_currency, quote_currency, effective_date) do nothing;
