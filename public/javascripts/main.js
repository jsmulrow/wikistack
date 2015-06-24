$(document).ready(function() {
	console.log('loaded');
	$('#edit-comments-btn').on('click', function() {
		console.log('clicked');
		$('.delete-btn').each(function() {
			$(this).toggle();
		});
	});
});