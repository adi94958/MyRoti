<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login - MYROTI</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container"><br>
        <div class="col-md-4 col-md-offset-4">
            <h2 class="text-center"><b>MYRoti</b></h3>
            <hr>
            <?php if(session('error')): ?>
            <div class="alert alert-danger">
                <b>Opps!</b> <?php echo e(session('error')); ?>

            </div>
            <?php endif; ?>
            <form action="<?php echo e(route('actionlogin')); ?>" method="post">
            <?php echo csrf_field(); ?>
                <div class="form-group">
                    <label>Username</label>
                    <input type="username" name="username" class="form-control" placeholder="Enter Username" required="">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password" required="">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Log In</button>
                <hr>
                <p class="text-center">Belum punya akun? <a href="#">Register</a> sekarang!</p>
            </form>
        </div>
    </div>
</body>
</html><?php /**PATH C:\xampp\htdocs\larapel-ku\resources\views/auth/login.blade.php ENDPATH**/ ?>