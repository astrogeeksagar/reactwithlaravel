# ⚛️ React + Laravel API Boilerplate

A **full-stack integration boilerplate** using [React](https://reactjs.org/) (Frontend) and [Laravel 12](https://laravel.com/) (Backend API), built by [Sagar Rajput](https://github.com/astrogeeksagar) — passionate <b>Software Developer</b> & <b>Cosmic Enthusiast</b> 🌌

---

## 📦 Features

- 🎯 Laravel 12 API-based backend
- ⚛️ React frontend using Create React App
- 📮 Seamless API communication (axios)
- ✅ Form validation and clean structure
- 🔄 Easily extendable for real projects

---

## 🚀 Getting Started

### ⬇️ Clone the repository

```bash
git clone https://github.com/astrogeeksagar/reactwithlaravel.git
cd reactwithlaravel
```

---

## ⚙️ Setup Instructions

### 📁 Laravel Backend
```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan install:api
php artisan serve
```

📝 Make sure to configure your `.env` database credentials.

### 💻 React Frontend

```bash
cd ../react-frontend
npm install
npm start
```

📍 The React app will run on `http://localhost:3000`  
📍 The Laravel API runs on `http://localhost:8000`

---

## 🔗 API Integration

In your Laravel backend:

**routes/api.php**
```php
use App\Http\Controllers\ContactFormController;

Route::post('/submit-form', [ContactFormController::class, 'submit']);
```

**ContactFormController.php**
```php
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = md5('12345678');
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Form submitted successfully sagar!',
        ]);
    }
```

In your React frontend:

**Example Axios POST**
```js
axios.post('http://localhost:8000/api/submit-form', {
  name: 'Astrogeeksagar',
  email: 'sagarrajpoot7860@gmail.com',
  message: 'Hello from Astrogeeksagar!',
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

## 🧰 Technologies Used

- Laravel 12
- React (CRA)
- Axios
- PHP 8+
- Node.js
- Bootstrap (optional)

---

## 🙋‍♂️ Connect with Me

> Feel free to reach out if you want to collaborate, contribute, or just chat!

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/astrogeeksagarcoder/)
[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/astrogeeksagar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/astrogeeksagar/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/astrogeek_sagar)

🌐 Website: [astrogeeksagar.com](https://astrogeeksagar.com)  
📧 Email: sagarrajpoot7860@gmail.com  
📱 WhatsApp: [+91 9116262471](https://api.whatsapp.com/send/?phone=9116262471&text=Hello%20Sagar)

---

### ⭐ Star this repo if you find it useful!
