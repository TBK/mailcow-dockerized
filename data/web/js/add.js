$(document).ready(function() {
	// add.php
	// Get max. possible quota for a domain when domain field changes
	$('#addSelectDomain').on('change', function() {
		$.get("/api/v1/get/domain/" + this.value, function(data){
      var result = $.parseJSON(JSON.stringify(data));
      max_new_mailbox_quota = ( result.max_new_mailbox_quota / 1048576);
			if (max_new_mailbox_quota != '0') {
				$("#quotaBadge").html('max. ' +  max_new_mailbox_quota + ' MiB');
				$('#addInputQuota').attr({"disabled": false, "value": "", "type": "number", "max": max_new_mailbox_quota});
			}
			else {
				$("#quotaBadge").html('max. ' + max_new_mailbox_quota + ' MiB');
				$('#addInputQuota').attr({"disabled": true, "value": "", "type": "text", "value": "n/a"});
			}
		});
	});
});
