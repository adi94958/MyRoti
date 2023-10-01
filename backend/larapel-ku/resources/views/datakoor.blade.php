<!DOCTYPE html>
<html lang="en">
<head>
    <title>Kelola Data Koordinator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <link href="https://cdn.datatables.net/v/dt/dt-1.13.6/datatables.min.css" rel="stylesheet">
</head>
<body>
<table id="example" class="display dataTable" style="width:100%">
    <thead>
        <tr>
            <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" aria-sort="ascending" style="width: 111px;">No</th>
            <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" aria-sort="ascending" style="width: 111px;">Name</th>
            <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" aria-sort="ascending" style="width: 111px;">Username</th>
            <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" aria-sort="ascending" style="width: 111px;">Password</th>
            <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" aria-sort="ascending" style="width: 111px;">Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($koordinators as $koordinator)
        <tr>
            <td class="sorting_1">{{ $loop->iteration }}</td>
            <td class="sorting_1">{{ $koordinator->nama }}</td>
            <td class="sorting_1">{{ $koordinator->username }}</td>
            <td class="sorting_1">{{ str_repeat('*', strlen($koordinator->password)) }}</td>
            <td class="sorting_1">
                <a href="">Edit</a>
                <a href="">Delete</a>
            </td>
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
        </tr>
    </tfoot>
</table>

<!-- Tambahkan tautan ke berkas JavaScript Bootstrap -->
<script src="https://cdn.datatables.net/v/dt/dt-1.13.6/datatables.min.js"></script>
</body>
</html>
