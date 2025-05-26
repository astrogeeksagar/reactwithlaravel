
# React Frontend and Laravel 12 Backend Integration

This project demonstrates connecting a React frontend form with a Laravel 12 backend API endpoint.

## Steps

1. **Create React frontend project**

```bash
npx create-react-app react-form-frontend
cd react-form-frontend
npm start


2. **Create Laravel backend project**

```bash
composer create-project laravel/laravel laravel-form-backend
cd laravel-form-backend
php artisan serve
```

3. **Install Laravel API routes and Sanctum**

```bash
php artisan install:api
```

This creates `routes/api.php` and configures API middleware.

4. **Define API route in `routes/api.php`**

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactFormController;

Route::post('/submit-form', [ContactFormController::class, 'submit']);
```

5. **Create `ContactFormController`**

```bash
php artisan make:controller ContactFormController
```

Implement the `submit` method to handle incoming form data.

6. **React frontend form setup**

- Create a simple form in React that sends a POST request to `http://localhost:8000/api/submit-form`
- Use `fetch` or `axios` to send form data as JSON.

7. **CORS configuration**

- Manually add CORS headers or middleware to Laravel since default package installation failed.
- For quick setup, add middleware or headers to allow requests from React app origin.

## Testing

- Run Laravel backend: `php artisan serve`
- Run React frontend: `npm start`
- Submit form from React, data should be received and processed by Laravel API.

---

This setup ensures React frontend communicates with Laravel backend API successfully.
