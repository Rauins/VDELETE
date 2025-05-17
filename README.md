# 💾 ÖNEMLİ BİLGİLER

## 💪 Gerekli Yazılımlar:

* Bir kod editörü (VS Code önerilir)
* [Node.js](https://nodejs.org) (yüklenmeden proje çalışmaz)

## 📅 Twitter Verisi Gerekli

1. Twitter'dan **veri arşivinizi** indirin:
   `Daha Fazla > Ayarlar ve Gizlilik > Hesap > Twitter verilerin > Arşiv iste`

2. Arşiv size ulaştıktan sonra içinden `tweets.js` dosyasını klasöre ekleyin.

3. `tweets.js` dosyasının en başındaki tanımı şu şekilde değiştirin:

   ```js
   export default [
     ...
   ]
   ```

> `npm install` komutu için **Node.js** kurulu olmalıdır.

---

## 🤪 Filtreleme Özelliği (Filtre.exe)

### 🔤 Kelime Filtresi:

İstediğiniz kelimeleri şu şekilde girin:
`Elma, Armut, Pizza, Yumurta`
Hiç kelime filtresi istemiyorsanız sadece **Enter**'a basın.

### ❤️ Beğeni Filtresi:

Örnek: `5` girerseniz 5 beğeni altındaki tweetler hedef alınır.
(Boş bırakmayın, minimum `1` önerilir.)

### 📅 Tarih Aralığı:

Tarihler tire (-) ile olmalıdır:
**Başlangıç:** `2024-01-01`
**Bitiş:** `2024-12-31`

---

## ⚙️ Nasıl Çalıştırılır?

1. Proje klasöründe boş bir alana **sağ tıklayıp**
   "**Terminalde Aç**" seçeneğine tıklayın.

2. Aşağıdaki komutu çalıştırın:

   ```
   npm install
   ```

   Bu, gerekli modülleri (Playwright gibi) yükler.

3. Kurulum tamamlandıktan sonra şu komutu yazın:

   ```
   node VDelete.js
   ```

4. Açılan tarayıcıdan **Twitter hesabınıza giriş yapın.**

5. Giriş yaptıktan sonra terminal ekranına dönüp **Enter** tuşuna basın.

Script uygun tweetleri otomatik olarak silmeye başlayacaktır.

---

## 🛠️ Kullanıcı Adı Ayarı:

`VDelete.js` dosyasını bir kod editörü veya Not Defteri ile açın.

"**rauinks**" kelimesini aratın ve kendi Twitter kullanıcı adınızla değiştirin.

---

## ⛔️ Silmeyi Durdurmak İçin:

Terminalde:

```
CTRL + C
```

---

## ❓ Yardım ve İletişim:

Her türlü destek ve iletişim için:
📩 [https://x.com/rauinks](https://x.com/rauinks)
