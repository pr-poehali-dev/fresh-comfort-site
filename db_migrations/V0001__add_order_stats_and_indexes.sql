
-- Расширяем таблицу orders: добавляем поля для аналитики
ALTER TABLE t_p89379049_fresh_comfort_site.orders
  ADD COLUMN IF NOT EXISTS source varchar(50) DEFAULT 'site',
  ADD COLUMN IF NOT EXISTS completed_at timestamp NULL,
  ADD COLUMN IF NOT EXISTS cancelled_reason text NULL;

-- Индексы для быстрой выборки статистики по orders
CREATE INDEX IF NOT EXISTS idx_orders_service ON t_p89379049_fresh_comfort_site.orders(service);
CREATE INDEX IF NOT EXISTS idx_orders_status ON t_p89379049_fresh_comfort_site.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON t_p89379049_fresh_comfort_site.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_booking_date ON t_p89379049_fresh_comfort_site.orders(booking_date);

-- Индексы для service_prices
CREATE INDEX IF NOT EXISTS idx_prices_service ON t_p89379049_fresh_comfort_site.service_prices(service);
CREATE INDEX IF NOT EXISTS idx_prices_recorded_at ON t_p89379049_fresh_comfort_site.service_prices(recorded_at);

-- Таблица сводной статистики по заказам (по услугам и периодам)
CREATE TABLE IF NOT EXISTS t_p89379049_fresh_comfort_site.order_stats (
  id serial PRIMARY KEY,
  period_date date NOT NULL,
  service varchar(100) NOT NULL,
  orders_count integer NOT NULL DEFAULT 0,
  completed_count integer NOT NULL DEFAULT 0,
  cancelled_count integer NOT NULL DEFAULT 0,
  total_revenue integer NOT NULL DEFAULT 0,
  avg_price integer NOT NULL DEFAULT 0,
  updated_at timestamp DEFAULT now(),
  UNIQUE(period_date, service)
);

CREATE INDEX IF NOT EXISTS idx_order_stats_period ON t_p89379049_fresh_comfort_site.order_stats(period_date);
CREATE INDEX IF NOT EXISTS idx_order_stats_service ON t_p89379049_fresh_comfort_site.order_stats(service);

-- Комментарии
COMMENT ON TABLE t_p89379049_fresh_comfort_site.order_stats IS 'Сводная статистика заказов по услугам и датам';
COMMENT ON TABLE t_p89379049_fresh_comfort_site.service_prices IS 'История изменения цен на услуги';
COMMENT ON COLUMN t_p89379049_fresh_comfort_site.orders.status IS 'new | confirmed | completed | cancelled';
COMMENT ON COLUMN t_p89379049_fresh_comfort_site.orders.source IS 'Источник заявки: site | phone | telegram';
