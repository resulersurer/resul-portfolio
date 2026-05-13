-- Create lead tracking tables
CREATE TABLE "LeadCompany" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "sector" TEXT NOT NULL,
  "district" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "websiteStatus" TEXT NOT NULL,
  "leadStatus" TEXT NOT NULL,
  "lastContactedAt" TIMESTAMP(3) WITH TIME ZONE,
  "nextFollowUpAt" TIMESTAMP(3) WITH TIME ZONE,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE "LeadMeeting" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "scheduledAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  "status" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT "LeadMeeting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "LeadCompany"("id") ON DELETE CASCADE
);

INSERT INTO "LeadCompany" ("id", "name", "sector", "district", "phone", "websiteStatus", "leadStatus", "notes", "createdAt", "updatedAt") VALUES
  ('d09bb0f9-ef6e-4929-9bb2-8d5ba27c81a1', 'Fatih Tesisat', 'Tesisat', 'Fatih', '+90 537 230 94 96', 'Web sitesi yok', 'Yeni lead kaydı.', '2026-05-13T10:00:00Z', '2026-05-13T10:00:00Z'),
  ('46b7ed31-68c7-4956-9d1c-4d4543663380', 'İstanbul 212 Tesisat', 'Tesisat', 'Şişli', '+90 501 030 06 18', 'Sadece sosyal medya var', 'İlk temas bekleniyor.', '2026-05-13T10:05:00Z', '2026-05-13T10:05:00Z'),
  ('8fcb5de0-989d-4c5f-ae0d-3c8dfe47fa57', 'İstanbul Temizlik Şirketi', 'Temizlik', 'Ümraniye', '+90 506 639 40 45', 'Eski web sitesi var', 'Teklif hazırlanıyor.', '2026-05-13T10:10:00Z', '2026-05-13T10:10:00Z'),
  ('1f4c9b49-b55f-4369-8abc-db8c0f5f0b66', 'Sevil Çilingir', 'Çilingir', 'Sancaktepe', '+90 538 671 62 33', 'Web sitesi görünmüyor', 'Aranacak.', '2026-05-13T10:15:00Z', '2026-05-13T10:15:00Z'),
  ('b14f0d6d-fc24-4489-9754-83ab5ddfc2f2', 'Anahtarcı Çilingirci', 'Çilingir', 'Bayrampaşa', '+90 535 952 35 18', 'Web sitesi yok', 'İlk görüşme planlanmalı.', '2026-05-13T10:20:00Z', '2026-05-13T10:20:00Z'),
  ('a5e2d4df-ba60-4396-9de7-9c3a8d9a9fc3', 'Kürşat Oto', 'Oto servis', 'Maltepe', '+90 532 551 50 34', 'Doğrulanacak', 'Whatsapp üzerinden takip.', '2026-05-13T10:25:00Z', '2026-05-13T10:25:00Z');
