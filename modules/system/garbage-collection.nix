{

	programs.nh.clean = {
		enable = true;
		dates = "monthly";
		extraArgs = "--keep-since 90d --keep 10 --no-direnv";
	};

	nix.gc = {
	  automatic = false;
	  dates = "monthly";
	  options = "--delete-older-than 90d";
	};

	nix.settings = {
		min-free = 50 * 1024 * 1024 * 1024;  # 5 GiB
		max-free = 100 * 1024 * 1024 * 1024; # 20 GiB
	};
}
