# Crafter Sajjad - Android APK নির্দেশিকা ও প্যাকেজ

এই ফোল্ডারে অ্যান্ড্রয়েড (Android) এর জন্য পূর্ণাঙ্গ কনফিগারেশন যুক্ত করা হয়েছে যাতে আপনি সরাসরি যেকোনো অ্যান্ড্রয়েড ফোনে অ্যাপটি চালাতে বা আসল APK ফাইল পেতে পারেন।

---

## ১. সরাসরি আপনার ফোনে ইন্সটল করার সহজ উপায় (কোনো APK ফাইল ডাউনলোড ছাড়াই):
এই অ্যাপটিকে একটি **Official PWA (Progressive Web App)** এ রূপান্তর করা হয়েছে।
1. যেকোনো অ্যান্ড্রয়েড ফোনে Chrome বা Edge ব্রাউজারে এই সাইটটি ওপেন করুন:
   `https://ais-pre-v6axv5q2ttaxi7themaxkt-695577047220.asia-southeast1.run.app`
2. স্ক্রিনের উপরের হেডার বা ব্যানারে **"Android App"** বা ক্রোম ব্রাউজারের **⋮ (Menu) -> "Install App"** বা **"Add to Home screen"** চাপুন।
3. সাথে সাথে আপনার মোবাইল স্ক্রিনে **Crafter Sajjad** অ্যাপের অফিসিয়াল আইকন চলে আসবে এবং এটি হুবহু APK অ্যাপের মতো ফুল স্ক্রিনে চলবে!

---

## ২. সরাসরি অফিসিয়াল সাইন করা APK ফাইল তৈরি ও ডাউনলোড (PWABuilder):
Microsoft ও Google এর অফিসিয়াল ফ্রি টুল **PWABuilder** দিয়ে ৩০ সেকেন্ডে সাইন করা `.apk` ও `.aab` (Play Store ready) ডাউনলোড করতে পারেন:
1. ভিজিট করুন: [https://www.pwabuilder.com](https://www.pwabuilder.com)
2. সাইট ইউআরএল বক্সে পেস্ট করুন:
   `https://ais-pre-v6axv5q2ttaxi7themaxkt-695577047220.asia-southeast1.run.app`
3. **"Start"** এ ক্লিক করে **"Package for Stores"** -> **"Android"** নির্বাচন করুন।
4. **"Generate APK"** বাটনে ক্লিক করলে আপনার কম্পিউটারে সরাসরি রেডি `.apk` ফাইল ডাউনলোড হয়ে যাবে!

---

## ৩. Android Studio বা Bubblewrap দিয়ে লোকাল APK বিল্ড:
যদি আপনি কমান্ড লাইনে সরাসরি APK বিল্ড করতে চান:
```bash
# Bubblewrap ইন্সটল করুন:
npm install -g @bubblewrap/cli

# APK বিল্ড করুন:
bubblewrap build --manifest=bubblewrap-build.json
```
ফলাফল: `app-release-signed.apk` ফাইল তৈরি হবে যা যেকোনো ফোনে ইনস্টলযোগ্য।
